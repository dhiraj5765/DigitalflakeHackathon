import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/dashboard/home">Home</Link></li>
        <li><Link to="/dashboard/category">Category</Link></li>
        <li><Link to="/dashboard/subcategory">Subcategory</Link></li>
        <li><Link to="/dashboard/products">Products</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
