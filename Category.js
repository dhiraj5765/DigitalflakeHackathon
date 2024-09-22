import React, { useState, useEffect } from 'react';
import './Category.css';

const Category = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Electronics', image: '/images/laptop_img.jpg', status: 'Active' },
    { id: 2, name: 'Clothing', image: '/images/clothing.jpg', status: 'Active' },
    { id: 3, name: 'Books', image: '/images/books.jpg', status: 'Inactive' },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({
    id: null,
    name: '',
    image: '',
    status: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch('http://localhost:3000/api/categories')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory({
      ...currentCategory,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentCategory.id) {
      // Update existing category
      setCategories(categories.map(category => 
        category.id === currentCategory.id ? currentCategory : category
      ));
    } else {
      // Add new category
      const newId = categories.length > 0 ? Math.max(categories.map(cat => cat.id)) + 1 : 1;
      setCategories([...categories, { ...currentCategory, id: newId }]);
    }
    setMessage('Category saved successfully!');
    setShowForm(false);
    setCurrentCategory({
      id: null,
      name: '',
      image: '',
      status: '',
    });
  };

  const handleDelete = (id) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setShowForm(true);
  };

  return (
    <div>
      <h1>Category Management</h1>
      {message && <p>{message}</p>}

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={() => {
          setShowForm(true);
          setCurrentCategory({ id: null, name: '', image: '', status: '' });
        }}>Add New</button>
      </div>

      {showForm && (
        <div className="form-container">
          <h2>{currentCategory.id ? 'Edit Category' : 'Add New Category'}</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={currentCategory.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Image Path:</label>
              <input
                type="text"
                name="image"
                value={currentCategory.image}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Status:</label>
              <input
                type="text"
                name="status"
                value={currentCategory.status}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <button type="submit">{currentCategory.id ? 'Update' : 'Submit'}</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Category ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map(category => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                {category.image && (
                  <img src={category.image} alt={category.name} width="50" />
                )}
              </td>
              <td>{category.status}</td>
              <td>
                <button onClick={() => handleEdit(category)}>Edit</button>
                <button onClick={() => handleDelete(category.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
