import React, { useState, useEffect } from 'react';
import './SubCategory.css';

const SubCategory = () => {
  const [subCategories, setSubCategories] = useState([
    { id: 1, name: 'Mobile Phones', category: 'Electronics', status: 'Active', image: '/images/mobile.jpg' },
    { id: 2, name: 'Laptops', category: 'Electronics', status: 'Active', image: '/images/laptop_img.jpg' },
    { id: 3, name: 'Men\'s Wear', category: 'Clothing', status: 'Inactive', image: '/images/clothing.jpg' },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [currentSubCategory, setCurrentSubCategory] = useState({
    id: null,
    name: '',
    category: '',
    status: '',
    image: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const fetchSubCategories = () => {
    fetch('http://localhost:3000/api/subcategories')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setSubCategories(data))
      .catch(error => console.error('Error fetching subcategories:', error));
  };

  const filteredSubCategories = subCategories.filter(subCategory =>
    subCategory.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentSubCategory({
      ...currentSubCategory,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentSubCategory.id) {
      // Update existing subcategory
      setSubCategories(subCategories.map(subCategory => 
        subCategory.id === currentSubCategory.id ? currentSubCategory : subCategory
      ));
    } else {
      // Add new subcategory
      const newId = subCategories.length > 0 ? Math.max(subCategories.map(cat => cat.id)) + 1 : 1;
      setSubCategories([...subCategories, { ...currentSubCategory, id: newId }]);
    }
    setMessage('Subcategory saved successfully!');
    setShowForm(false);
    setCurrentSubCategory({
      id: null,
      name: '',
      category: '',
      status: '',
      image: '',
    });
  };

  const handleDelete = (id) => {
    setSubCategories(subCategories.filter(subCategory => subCategory.id !== id));
  };

  const handleEdit = (subCategory) => {
    setCurrentSubCategory(subCategory);
    setShowForm(true);
  };

  return (
    <div>
      <h1>Subcategory Management</h1>
      {message && <p>{message}</p>}

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search subcategories..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={() => {
          setShowForm(true);
          setCurrentSubCategory({ id: null, name: '', category: '', status: '', image: '' });
        }}>Add New</button>
      </div>

      {showForm && (
        <div className="form-container">
          <h2>{currentSubCategory.id ? 'Edit Subcategory' : 'Add New Subcategory'}</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={currentSubCategory.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Category:</label>
              <input
                type="text"
                name="category"
                value={currentSubCategory.category}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Status:</label>
              <input
                type="text"
                name="status"
                value={currentSubCategory.status}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Image Path:</label>
              <input
                type="text"
                name="image"
                value={currentSubCategory.image}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <button type="submit">{currentSubCategory.id ? 'Update' : 'Submit'}</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Subcategory ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Status</th>
            <th>Image</th> {/* Added Image Column */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubCategories.map(subCategory => (
            <tr key={subCategory.id}>
              <td>{subCategory.id}</td>
              <td>{subCategory.name}</td>
              <td>{subCategory.category}</td>
              <td>{subCategory.status}</td>
              <td>
                {subCategory.image && (
                  <img src={subCategory.image} alt={subCategory.name} width="50" />
                )}
              </td>
              <td>
                <button onClick={() => handleEdit(subCategory)}>Edit</button>
                <button onClick={() => handleDelete(subCategory.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubCategory;
