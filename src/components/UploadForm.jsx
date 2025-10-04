import React, { useState } from 'react';

const UploadForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    country: '',
    description: '',
    photo: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-blue-800 to-blue-900 p-6 rounded-xl shadow-lg border-2 border-black">
      <h3 className="text-xl font-bold text-white mb-6 text-center">Upload New Coin</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-blue-100 text-sm font-bold mb-2">
            Coin Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            required
          />
        </div>
        
        <div>
          <label className="block text-blue-100 text-sm font-bold mb-2">
            Year
          </label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            required
          />
        </div>
        
        <div>
          <label className="block text-blue-100 text-sm font-bold mb-2">
            Country
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            required
          />
        </div>
        
        <div>
          <label className="block text-blue-100 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 resize-none"
            required
          />
        </div>
        
        <div>
          <label className="block text-blue-100 text-sm font-bold mb-2">
            Photo
          </label>
          <input
            type="file"
            name="photo"
            onChange={handleChange}
            accept="image/*"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          Upload Coin
        </button>
      </form>
    </div>
  );
};

export default UploadForm;