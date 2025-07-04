import React, { useState } from 'react';
import type { FoodItem } from '../types/FoodItem';
import Modal from '../components/Modal';

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<FoodItem[]>([
    {
      id: 'prod1',
      imageSrc: 'https://storage.googleapis.com/a1aa/image/3413175d-3cb8-46d5-e81e-f170bcc827a9.jpg',
      imageAlt: 'Nasi Goreng Spesial',
      title: 'Nasi Goreng Spesial',
      description: 'Nasi goreng dengan telur dan sayuran.',
      price: 'Rp 15.000',
      pickupTime: '19.00 - 20.00',
      stock: 5,
    },
    {
      id: 'prod2',
      imageSrc: 'https://storage.googleapis.com/a1aa/image/9b12dc9c-d92e-416a-9ffa-80e5ae19c0c6.jpg',
      imageAlt: 'Roti Tawar',
      title: 'Roti Tawar',
      description: 'Roti tawar lembut dengan selai stroberi.',
      price: 'Rp 8.000',
      pickupTime: '18.30 - 19.30',
      stock: 10,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<FoodItem | null>(null);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const handleAddEditProduct = (product: FoodItem) => {
    if (currentProduct) {
      setProducts(products.map((p) => (p.id === product.id ? product : p)));
    } else {
      setProducts([...products, { ...product, id: `prod${Date.now()}` }]);
    }
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const handleEditClick = (product: FoodItem) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (productId: string) => {
    setProductToDelete(productId);
    setIsConfirmDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setProducts(products.filter((p) => p.id !== productToDelete));
    setIsConfirmDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const cancelDelete = () => {
    setIsConfirmDeleteModalOpen(false);
    setProductToDelete(null);
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold text-green-700 mb-6">Manajemen Makanan</h3>

      <button
        onClick={() => {
          setCurrentProduct(null);
          setIsModalOpen(true);
        }}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition mb-6"
      >
        Tambah Makanan Baru
      </button>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gambar
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama Makanan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Harga
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stok
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Waktu Ambil
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {product.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.stock}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.pickupTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(product.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentProduct ? 'Edit Makanan' : 'Tambah Makanan Baru'}
      >
        <ProductForm
          initialData={currentProduct || { id: '', imageSrc: '', imageAlt: '', title: '', description: '', price: '', pickupTime: '', stock: 0 }}
          onSave={handleAddEditProduct}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isConfirmDeleteModalOpen}
        onClose={cancelDelete}
        title="Konfirmasi Hapus"
      >
        <p className="text-gray-700 mb-4">
          Apakah Anda yakin ingin menghapus makanan ini?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={cancelDelete}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition"
          >
            Batal
          </button>
          <button
            onClick={confirmDelete}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition"
          >
            Hapus
          </button>
        </div>
      </Modal>
    </div>
  );
};

interface ProductFormProps {
  initialData: FoodItem;
  onSave: (product: FoodItem) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<FoodItem>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'stock' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
          Nama Makanan:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
          Deskripsi:
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500"
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
          Harga (Rp):
        </label>
        <input
          type="text" 
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500"
          placeholder="Contoh: Rp 15.000"
          required
        />
      </div>
      <div>
        <label htmlFor="stock" className="block text-gray-700 text-sm font-bold mb-2">
          Stok:
        </label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500"
          min="0"
          required
        />
      </div>
      <div>
        <label htmlFor="pickupTime" className="block text-gray-700 text-sm font-bold mb-2">
          Waktu Pengambilan:
        </label>
        <input
          type="text"
          id="pickupTime"
          name="pickupTime"
          value={formData.pickupTime}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500"
          placeholder="Contoh: 19.00 - 20.00"
          required
        />
      </div>
      <div>
        <label htmlFor="imageSrc" className="block text-gray-700 text-sm font-bold mb-2">
          URL Gambar:
        </label>
        <input
          type="text"
          id="imageSrc"
          name="imageSrc"
          value={formData.imageSrc}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500"
          placeholder="URL gambar makanan"
          required
        />
      </div>
      <div>
        <label htmlFor="imageAlt" className="block text-gray-700 text-sm font-bold mb-2">
          Alt Text Gambar:
        </label>
        <input
          type="text"
          id="imageAlt"
          name="imageAlt"
          value={formData.imageAlt}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500"
          placeholder="Deskripsi singkat gambar"
          required
        />
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
          Simpan
        </button>
      </div>
    </form>
  );
};

export default ProductManagement;
