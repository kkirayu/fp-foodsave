import React, { useState } from 'react';

interface UserData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  profilePic: string; 
}

interface EditBiodataFormProps {
  initialData: UserData;
  onSave: (newData: UserData) => void;
  onCancel: () => void;
}

const EditBiodataForm: React.FC<EditBiodataFormProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<UserData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">
          Nama Lengkap:
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500"
          required
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
          Nomor Telepon:
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
          Alamat:
        </label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows={3}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500"
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
          Simpan Perubahan
        </button>
      </div>
    </form>
  );
};

export default EditBiodataForm;
