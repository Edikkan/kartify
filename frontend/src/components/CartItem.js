import Image from 'next/image';
import { FaTrash } from 'react-icons/fa';

export default function CartItem({ item, onRemove, onUpdateQuantity }) {
  return (
    <div className="flex items-center space-x-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
      <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
        <Image
          src={item.images?.[0] || '/placeholder.jpg'}
          alt={item.name}
          width={96}
          height={96}
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
        <p className="text-sm text-gray-500 mt-1">
          Unit Price: ₦{item.price.toLocaleString()}
        </p>
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={() => onUpdateQuantity(item.quantity - 1)}
          className="w-8 h-8 border rounded-lg hover:bg-gray-100 flex items-center justify-center"
        >
          -
        </button>
        <span className="w-12 text-center font-semibold">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.quantity + 1)}
          className="w-8 h-8 border rounded-lg hover:bg-gray-100 flex items-center justify-center"
        >
          +
        </button>
      </div>

      <div className="text-right">
        <p className="font-bold text-primary-600">
          ₦{(item.price * item.quantity).toLocaleString()}
        </p>
      </div>

      <button
        onClick={onRemove}
        className="text-accent-600 hover:text-accent-700 p-2"
        title="Remove item"
      >
        <FaTrash />
      </button>
    </div>
  );
}
