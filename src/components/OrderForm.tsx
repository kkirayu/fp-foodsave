// src/components/OrderForm.tsx
import React, { useState } from 'react';
import type { FoodItem } from '../types/FoodItem'; // Pastikan path ini benar

interface OrderFormProps {
  foodItem: FoodItem;
  onPlaceOrder: (item: FoodItem, quantity: number, notes: string) => void;
  onCancel: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ foodItem, onPlaceOrder, onCancel }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity > 0) {
      onPlaceOrder(foodItem, quantity, notes);
    } else {
      alert('Kuantitas harus lebih dari 0.'); // Gunakan modal kustom di aplikasi nyata
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h4 className="text-xl font-semibold text-green-800">{foodItem.title}</h4>
        <p className="text-gray-600 text-sm">{foodItem.description}</p>
        <p className="text-green-700 font-bold text-lg mt-2">{foodItem.price}</p>
        <p className="text-gray-500 text-sm">Waktu Ambil: {foodItem.pickupTime}</p>
      </div>

      <div>
        <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2">
          Kuantitas:
        </label>
        <input
          type="number"
          id="quantity"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-gray-700 text-sm font-bold mb-2">
          Catatan Tambahan (Opsional):
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500"
          placeholder="Contoh: Tanpa saus, tolong siapkan di tas kertas."
        ></textarea>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition"
        >
          Batal
        </button>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition"
        >
          Konfirmasi Pesanan
        </button>
      </div>
    </form>
  );
};

export default OrderForm;
