// AddProduct.js
import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = ({ onClose }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('Active');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('status', status);

    // Debug: Check if the formData is correct
    console.log('Form Data:', {
      name,
      image,
      status
    });

    try {
      const response = await axios.post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const handleSubmit = async (e) => {
        e.preventDefault();
      
        // Check if form data is populated correctly
        console.log("Submitting product...");
        console.log("Name:", name);
        console.log("Image:", image);
        console.log("Status:", status);
      
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);
        formData.append('status', status);
      
        try {
          const response = await axios.post('/api/products', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
      
          // Check the response after form submission
          console.log("Response from server:", response.data);
      
          onClose(); // Close the form/modal after successful submission
        } catch (error) {
          // Log any error that occurs during the API request
          console.error("Error adding product:", error);
        }
      };
      

      // Debug: Check response from the API
      console.log('Product added successfully:', response.data);

      onClose(); // Close the form/modal after successful submission
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Product Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="file" 
          onChange={(e) => setImage(e.target.files[0])} 
          required 
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button type="submit">Add Product</button>
      </form>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default AddProduct;
