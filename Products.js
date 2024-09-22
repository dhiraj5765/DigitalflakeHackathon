import React, { useState } from 'react';
import './Product.css';

const Product = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Electronics',
      subcategory: 'Laptops',
      product: 'HP Z-book',
      price: '$1500',
      status: 'Available',
      image: '/images/laptop_img.jpg',
    },
    {
      id: 2,
      name: 'Clothing',
      subcategory: 'Men Clothes',
      product: 'Blazor',
      price: '$20',
      status: 'Out of Stock',
      image: '/images/clothing.jpg',
    },
    {
      id: 3,
      name: 'Books',
      subcategory: 'Story Books',
      product: 'Bones of Fire',
      price: '$15',
      status: 'Available',
      image: '/images/books.jpg',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    name: '',
    subcategory: '',
    product: '',
    price: '',
    status: '',
    image: '',
  });

  const filteredProducts = products.filter(product =>
    product.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentProduct.id) {
      // Update existing product
      setProducts(products.map(product => (product.id === currentProduct.id ? currentProduct : product)));
    } else {
      // Add new product
      setProducts([...products, { ...currentProduct, id: products.length + 1 }]);
    }
    setShowForm(false);
    setCurrentProduct({
      id: null,
      name: '',
      subcategory: '',
      product: '',
      price: '',
      status: '',
      image: '',
    });
  };

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShowForm(true);
  };

  return (
    <div>
      <h1>Product Management</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={() => {
          setShowForm(true);
          setCurrentProduct({ id: null, name: '', subcategory: '', product: '', price: '', status: '', image: '' });
        }}>Add New</button>
      </div>

      {showForm && (
        <div className="form-container">
          <h2>{currentProduct.id ? 'Edit Product' : 'Add New Product'}</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={currentProduct.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Subcategory:</label>
              <input
                type="text"
                name="subcategory"
                value={currentProduct.subcategory}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Product:</label>
              <input
                type="text"
                name="product"
                value={currentProduct.product}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                type="text"
                name="price"
                value={currentProduct.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Status:</label>
              <input
                type="text"
                name="status"
                value={currentProduct.status}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Image Path:</label>
              <input
                type="text"
                name="image"
                value={currentProduct.image}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <button type="submit">{currentProduct.id ? 'Update' : 'Submit'}</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Subcategory</th>
            <th>Product</th>
            <th>Price</th>
            <th>Status</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.subcategory}</td>
              <td>{product.product}</td>
              <td>{product.price}</td>
              <td>{product.status}</td>
              <td>
                {product.image && (
                  <img src={product.image} alt={product.product} width="50" />
                )}
              </td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
