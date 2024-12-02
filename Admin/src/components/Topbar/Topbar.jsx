import { FaBell, FaUserCircle } from 'react-icons/fa';

const Topbar = () => {
  return (
    <div className="bg-white flex justify-between items-center p-4 shadow-md">
      <div className="text-xl font-semibold text-gray-700">Admin Panel</div>
      <div className="flex items-center space-x-6">
        <input type="text" placeholder="Search" className="p-2 border rounded-md text-gray-600" />
        <FaBell className="text-gray-600 text-xl" />
        <FaUserCircle className="text-gray-600 text-2xl" />
      </div>
    </div>
  );
};

export default Topbar;
