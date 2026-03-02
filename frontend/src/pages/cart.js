import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '@/context/CartContext';
import CartItem from '@/components/CartItem';

export default function Cart() {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50000 ? 0 : 2000;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }
    router.push('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <FaShoppingCart className="text-6xl text-gray-300 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven&apos;t added anything to your cart yet.</p>
        <Link href="/products" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={() => removeFromCart(item.id)}
              onUpdateQuantity={(quantity) => updateQuantity(item.id, quantity)}
            />
          ))}

          <div className="flex justify-between items-center pt-4 border-t">
            <button
              onClick={clearCart}
              className="text-accent-600 hover:text-accent-700 flex items-center space-x-2"
            >
              <FaTrash />
              <span>Clear Cart</span>
            </button>
            <Link href="/products" className="text-primary-600 hover:text-primary-700">
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">
                  {shipping === 0 ? 'FREE' : `₦${shipping.toLocaleString()}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-sm text-primary-600">
                  Add ₦{(50000 - subtotal).toLocaleString()} more for FREE shipping
                </p>
              )}
              <div className="border-t pt-4 flex justify-between text-lg">
                <span className="font-bold">Total</span>
                <span className="font-bold text-primary-600">₦{total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full btn-primary py-4 mb-4"
            >
              Proceed to Checkout
            </button>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span>✓</span>
                <span>Secure checkout</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>✓</span>
                <span>Free returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>✓</span>
                <span>Multiple payment options</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
