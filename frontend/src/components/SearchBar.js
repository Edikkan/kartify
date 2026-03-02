import { useState } from 'react';
import { useRouter } from 'next/router';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
      <button
        type="submit"
        className="bg-primary-600 text-white px-6 py-2 rounded-r-lg hover:bg-primary-700 transition-colors"
      >
        <FaSearch />
      </button>
    </form>
  );
}
