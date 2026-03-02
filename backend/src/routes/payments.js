const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const { protect } = require('../middleware/auth');
const { Order } = require('../models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-intent', protect, catchAsync(async (req, res, next) => {
  const { orderId } = req.body;

  const order = await Order.findByPk(orderId);

  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  if (order.userId !== req.user.id) {
    return next(new AppError('Not authorized', 403));
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(order.total * 100),
    currency: 'ngn',
    metadata: {
      orderId: order.id,
      orderNumber: order.orderNumber,
    },
  });

  res.status(200).json({
    success: true,
    clientSecret: paymentIntent.client_secret,
  });
}));

router.post('/webhook', express.raw({ type: 'application/json' }), catchAsync(async (req, res, next) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      await Order.update(
        { paymentStatus: 'paid', paymentId: paymentIntent.id },
        { where: { id: paymentIntent.metadata.orderId } }
      );
      break;
    case 'payment_intent.payment_failed':
      const failedIntent = event.data.object;
      await Order.update(
        { paymentStatus: 'failed' },
        { where: { id: failedIntent.metadata.orderId } }
      );
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
}));

module.exports = router;
