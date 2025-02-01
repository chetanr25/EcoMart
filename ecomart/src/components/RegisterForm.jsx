'use client';
import { useState } from 'react';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    // Company Head Details
    companyName: '',
    ownerEmail: '',
    ownerName: '',
    phoneNo: '',
    
    // Product Details
    productName: '',
    category: '',
    productDescription: '',
    brandName: '',
    productImage: '',
    price: '',
    productLink: '',
    certifications: [{ id: 1, name: '', file: null }],
    tags: []
  });

  const [imagePreview, setImagePreview] = useState('');



  // Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        productImage: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCertificateChange = (id, file) => {
    if (file && file.type === 'application/pdf') {
      const newCertificates = formData.certifications.map(cert => 
        cert.id === id ? { ...cert, name: file.name, file: file } : cert
      );
      setFormData(prev => ({
        ...prev,
        certifications: newCertificates
      }));
    } else {
      alert('Please upload a PDF file');
    }
  };

  const addCertificate = () => {
    const newId = Math.max(...formData.certifications.map(cert => cert.id)) + 1;
    setFormData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { id: newId, name: '', file: null }]
    }));
  };

  const removeCertificate = (id) => {
    if (formData.certifications.length > 1) {
      setFormData(prev => ({
        ...prev,
        certifications: prev.certifications.filter(cert => cert.id !== id)
      }));
    }
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault(); // Prevent form submission
      const newTag = e.target.value.trim();
      if (!formData.tags.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }));
      }
      e.target.value = ''; // Clear input after adding tag
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };


  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Product Registration</h2>

    {/* Company Details Section */}
    <div className="mb-8 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Company Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Company Name*</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Owner Name*</label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Owner Email*</label>
              <input
                type="email"
                name="ownerEmail"
                value={formData.ownerEmail}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number*</label>
              <input
                type="tel"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100"
              />
            </div>
          </div>
        </div>


                {/* Product Details Section */}
                <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Product Details</h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Basic Product Info */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter product name"
              />
            </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select a category</option>
                <option value="stationery">Stationery</option>
                <option value="homeDecor">Home Decor</option>
                <option value="clothing">Clothing</option>
                <option value="electronics">Electronics</option>
                <option value="beauty">Beauty & Personal Care</option>
                <option value="food">Food & Beverages</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-4 col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Product Description *
              </label>
              <textarea
                name="productDescription"
                value={formData.productDescription}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="4"
                placeholder="Enter product description"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Brand Name *
              </label>
              <input
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter brand name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter price"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Product Link *
              </label>
              <input
                type="url"
                name="productLink"
                value={formData.productLink}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter product URL"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Product Image *
              </label>
              <input
                type="file"
                name="productImage"
                onChange={handleImageChange}
                required
                accept="image/*"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {imagePreview && (
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="mt-2 max-w-xs rounded-lg shadow-sm" 
                  required
                />
              )}
            </div>

            {/* Certifications Section */}
            <div className="col-span-2 mb-6">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-gray-700 text-sm font-bold">
                  Certifications (PDF) *
                </label>
                <button
                  type="button"
                  onClick={addCertificate}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <svg 
                    className="h-5 w-5 mr-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                    />
                  </svg>
                  Add Certificate
                </button>
              </div>

              <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
                {formData.certifications.map((cert) => (
                  <div 
                    key={cert.id} 
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        Certificate {cert.id}
                      </span>
                      {formData.certifications.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeCertificate(cert.id)}
                          className="p-1 hover:bg-red-100 rounded-full text-red-600 transition-colors"
                          title="Remove certificate"
                        >
                          <svg 
                            className="h-5 w-5" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleCertificateChange(cert.id, e.target.files[0])}
                        className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-green-50 file:text-green-700
                          hover:file:bg-green-100
                          cursor-pointer"
                        required={cert.id === 1}
                      />
                    </div>
                    
                    {cert.file && (
                      <div className="mt-2 flex items-center text-sm text-green-600">
                        <svg 
                          className="h-5 w-5 mr-2" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                          />
                        </svg>
                        {cert.name}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-gray-500 mt-2">
                At least one certificate is required. Only PDF files are accepted.
              </p>
            </div>

            {/* Tags Section */}
            <div className="col-span-2 mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">
    Tags*
  </label>
  <div className="relative">
    <input
      type="text"
      required
      placeholder="Type a tag and press Enter"
      onKeyDown={handleTagInputKeyDown}
      className="block w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
    />
  </div>
  
              {/* Selected Tags */}
              <div className="mt-2 flex flex-wrap gap-2">
    {formData.tags.map(tag => (
      <span
        key={tag}
        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
      >
        {tag}
        <button
          type="button"
          onClick={() => handleTagRemove(tag)}
          className="ml-2 inline-flex items-center p-0.5 hover:bg-green-200 rounded-full"
        >
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </span>
    ))}
  </div>
  <p className="text-sm text-gray-500 mt-1">
    Type a tag and press Enter to add it
  </p>
</div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200"
          >
            Register Product
          </button>
        </div>
        
      </div>
      </form>
    </div>
  );
}