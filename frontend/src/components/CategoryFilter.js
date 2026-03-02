export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="card">
      <h3 className="font-semibold mb-4">Categories</h3>
      <div className="space-y-2">
        <button
          onClick={() => onSelectCategory('all')}
          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
            selectedCategory === 'all'
              ? 'bg-primary-100 text-primary-700'
              : 'hover:bg-gray-100'
          }`}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id.toString())}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              selectedCategory === category.id.toString()
                ? 'bg-primary-100 text-primary-700'
                : 'hover:bg-gray-100'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
