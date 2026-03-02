import Link from 'next/link';
import { useState, useContext } from 'react';
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { AuthContext } from '@/context/AuthContext';
import { CartContext } from '@/context/CartContext';
import SearchBar from './SearchBar';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="bg-primary-700 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="hidden md:flex space-x-4">
            <span>📞 +234-800-KARTIFY</span>
            <span>✉️ support@kartify.com</span>
          </div>
          <div className="flex space-x-4">
            <Link href="/orders" className="hover:text-primary-200">
              Track Order
            </Link>
            <Link href="/help" className="hover:text-primary-200">
              Help
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            🛒 Kartify
          </Link>

          <div className="hidden md:flex flex-1 mx-8 max-w-2xl">
            <SearchBar />
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/products" className="hover:text-primary-600">
              Products
            </Link>
            <Link href="/categories" className="hover:text-primary-600">
              Categories
            </Link>
            <Link href="/deals" className="hover:text-primary-600 text-accent-600 font-medium">
              Deals
            </Link>

            {user ? (
              <>
                <Link href="/profile" className="flex items-center space-x-2 hover:text-primary-600">
                  <FaUser />
                  <span>{user.name}</span>
                </Link>
                <button onClick={logout} className="hover:text-primary-600">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-primary-600">
                  Login
                </Link>
                <Link href="/register" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}

            <Link href="/cart" className="relative hover:text-primary-600">
              <FaShoppingCart className="text-xl" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>

          <button
            className="md:hidden text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="md:hidden mt-4">
          <SearchBar />
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t animate-slideIn">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link href="/products" className="hover:text-primary-600">
              Products
            </Link>
            <Link href="/categories" className="hover:text-primary-600">
              Categories
            </Link>
            <Link href="/deals" className="hover:text-primary-600 text-accent-600">
              Deals
            </Link>
            {user ? (
              <>
                <Link href="/profile" className="hover:text-primary-600">
                  Profile
                </Link>
                <Link href="/orders" className="hover:text-primary-600">
                  Orders
                </Link>
                <button onClick={logout} className="text-left hover:text-primary-600">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-primary-600">
                  Login
                </Link>
                <Link href="/register" className="btn-primary text-center">
                  Sign Up
                </Link>
              </>
            )}
            <Link href="/cart" className="flex items-center space-x-2 hover:text-primary-600">
              <FaShoppingCart />
              <span>Cart ({totalItems})</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
