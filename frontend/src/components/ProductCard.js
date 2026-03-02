import Link from 'next/link';
import Image from 'next/image';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import { toast } from 'react-toastify';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success('Added to cart!');
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="card group">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.images?.[0] || '/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-accent-600 text-white text-xs font-bold px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
          {product.stock === 0 && (
            <span className="absolute top-2 right-2 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">
              Out of Stock
            </span>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-sm ${
                    i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviewCount || 0})</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-primary-600">
              ₦{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₦{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {product.stock > 0 && product.stock < 10 && (
            <p className="text-xs text-accent-600">Only {product.stock} left in stock</p>
          )}
        </div>
      </Link>

      {product.stock > 0 && (
        <button
          onClick={handleAddToCart}
          className="w-full mt-4 btn-primary flex items-center justify-center space-x-2"
        >
          <FaShoppingCart />
          <span>Add to Cart</span>
        </button>
      )}
    </div>
  );
}
