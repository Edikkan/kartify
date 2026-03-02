import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { FaArrowRight, FaStar, FaFire, FaPercent, FaTruck } from 'react-icons/fa';
import ProductCard from '@/components/ProductCard';
import { ProductContext } from '@/context/ProductContext';
import Loading from '@/components/Loading';

export default function Home() {
  const { products, loading, fetchProducts } = useContext(ProductContext);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([
    { id: 1, name: 'Electronics', icon: '📱', count: 1250 },
    { id: 2, name: 'Fashion', icon: '👕', count: 890 },
    { id: 3, name: 'Home & Garden', icon: '🏠', count: 567 },
    { id: 4, name: 'Sports', icon: '⚽', count: 432 },
    { id: 5, name: 'Beauty', icon: '💄', count: 678 },
    { id: 6, name: 'Books', icon: '📚', count: 345 },
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (products.length > 0) {
      setFeaturedProducts(products.filter(p => p.featured).slice(0, 8));
    }
  }, [products]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to Kartify
              <span className="block text-primary-200 mt-2">Your Shopping Destination</span>
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              Discover amazing products at unbeatable prices. Free shipping on orders over ₦50,000!
            </p>
            <div className="flex space-x-4">
              <Link href="/products" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Shop Now
              </Link>
              <Link href="/deals" className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                View Deals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4 card">
              <div className="bg-primary-100 p-4 rounded-full">
                <FaTruck className="text-3xl text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Free Shipping</h3>
                <p className="text-gray-600">On orders over ₦50,000</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 card">
              <div className="bg-accent-100 p-4 rounded-full">
                <FaPercent className="text-3xl text-accent-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Best Prices</h3>
                <p className="text-gray-600">We match any price</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 card">
              <div className="bg-green-100 p-4 rounded-full">
                <FaStar className="text-3xl text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Quality Products</h3>
                <p className="text-gray-600">100% guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="card text-center hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm">{category.count} Products</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link href="/products" className="text-primary-600 font-semibold flex items-center hover:underline">
              View All <FaArrowRight className="ml-2" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-gray-600 col-span-full text-center">No featured products available</p>
            )}
          </div>
        </div>
      </section>

      {/* Deals Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-accent-600 to-accent-800 rounded-2xl p-12 text-white text-center">
            <FaFire className="text-6xl mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Flash Sale!</h2>
            <p className="text-xl mb-8">Up to 70% off on selected items</p>
            <Link href="/deals" className="bg-white text-accent-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
              Shop Deals
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Chidinma O.', text: 'Best shopping experience! Fast delivery and great quality.', rating: 5 },
              { name: 'Emmanuel K.', text: 'Amazing prices and excellent customer service. Highly recommended!', rating: 5 },
              { name: 'Fatima A.', text: 'Love the variety of products. Everything I need in one place.', rating: 5 },
            ].map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <p className="font-semibold">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
