import { FaHome, FaChartPie, FaCube, FaUserFriends, FaTags, FaCog, FaBars, FaChevronLeft, FaShoppingBasket } from 'react-icons/fa'; // Updated icon imports
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Manage collapse state

  return (
    <div className={`bg-gray-900 text-white h-screen p-5 ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
      {/* Collapsible button */}
      <div className="flex justify-between items-center">
        <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaChevronLeft className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
        {isOpen && <span className="text-xl font-bold">Admin Panel</span>}
      </div>
      
      <ul className="mt-10 space-y-4">
        <li className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-md">
          <FaHome className="text-lg" /> {/* Updated to FaHome */}
          {isOpen && <Link to="/">Dashboard</Link>}
        </li>
        <li className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-md">
          <FaChartPie className="text-lg" /> {/* Updated to FaChartPie */}
          {isOpen && <Link to="/analytics">Analytics</Link>}
        </li>
        {/* New Customer Link */}
        <li className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-md">
          <FaUserFriends className="text-lg" /> {/* Icon for Customers */}
          {isOpen && <Link to="/customers">Customers</Link>}
        </li>
        <li className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-md">
          <FaCube className="text-lg" /> {/* Updated to FaCube */}
          {isOpen && <Link to="/products">Products</Link>}
        </li>
        {/* Home Screen */}
        <li className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-md">
          <FaShoppingBasket className="text-lg" /> {/* Updated to FaShoppingBasket */}
          {isOpen && <span><Link to="/FrontPage">Front-page</Link></span>}
        </li>
        {/* Orders Link */}
        <li className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-md">
          <FaTags className="text-lg" /> {/* Updated to FaTags */}
          {isOpen && <Link to="/orders">Orders</Link>}
        </li>
        {/* Categories Link */}
        <li className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-md">
          <FaUserFriends className="text-lg" /> {/* Updated to FaUserFriends */}
          {isOpen && <Link to="/AddCategory">Categories</Link>}
        </li>
        {/* Best Deals Link */}
        <li className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-md">
          <FaShoppingBasket className="text-lg" /> {/* Updated to FaShoppingBasket */}
          {isOpen && <Link to="/BestDeals">Best Deals</Link>}
        </li>
        {/* Settings Link */}
        <li className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-md">
          <FaCog className="text-lg" /> {/* Updated to FaCog */}
          {isOpen && <Link to="/settings">Settings</Link>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
