import { FaCogs } from 'react-icons/fa';

const Settings = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Settings</h1>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">General Settings</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Website Name</label>
          <input type="text" className="w-full mt-2 p-3 border border-gray-300 rounded-lg" placeholder="Enter website name" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Enable Maintenance Mode</label>
          <input type="checkbox" className="mt-2" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Admin Email</label>
          <input type="email" className="w-full mt-2 p-3 border border-gray-300 rounded-lg" placeholder="admin@example.com" />
        </div>

        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition">Save Settings</button>
      </div>

      {/* Additional sections can be added similarly */}
    </div>
  );
};

export default Settings;
