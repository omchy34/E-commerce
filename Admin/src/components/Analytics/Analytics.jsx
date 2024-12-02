import { FaDollarSign, FaUsers } from 'react-icons/fa';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const Analytics = () => {
  // Data for the charts
  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', "August", "September", "October", "November", "December"],
    datasets: [
      {
        label: 'Sales ($)',
        data: [1200, 1900, 3000, 5000, 2300, 3000, 4000],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  const barChartData = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D'],
    datasets: [
      {
        label: 'Product Performance',
        data: [500, 300, 400, 700],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ['Returning Customers', 'New Customers'],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Analytics</h1>
      
      {/* Key Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white p-3 rounded-lg shadow-md">
          <div className="flex items-center">
            <FaDollarSign className="text-3xl text-green-500" />
            <div className="ml-2">
              <p className="text-lg font-bold">$24,000</p>
              <p className="text-gray-500 text-sm">Total Revenue</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-3 rounded-lg shadow-md">
          <div className="flex items-center">
            <FaUsers className="text-3xl text-blue-500" />
            <div className="ml-2">
              <p className="text-lg font-bold">1,250</p>
              <p className="text-gray-500 text-sm">New Customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Line Chart - Sales Overview */}
        <div className="bg-white p-3 rounded-lg shadow-md h-64"> {/* Adjusted height */}
          <h2 className="text-lg font-semibold mb-2">Sales Overview</h2>
          <Line 
            data={lineChartData} 
            options={{ 
              responsive: true, 
              maintainAspectRatio: false, // Changed to false for better height control
              plugins: { legend: { position: 'top' } },
            }} 
          />
        </div>

        {/* Bar Chart - Product Performance */}
        <div className="bg-white p-3 rounded-lg shadow-md h-64"> {/* Adjusted height */}
          <h2 className="text-lg font-semibold mb-2">Product Performance</h2>
          <Bar 
            data={barChartData} 
            options={{ 
              responsive: true, 
              maintainAspectRatio: false, // Changed to false for better height control
              plugins: { legend: { position: 'top' } },
            }} 
          />
        </div>

        {/* Pie Chart - Customer Demographics */}
        <div className="bg-white p-3 rounded-lg shadow-md col-span-2 h-64"> {/* Adjusted height */}
          <h2 className="text-lg font-semibold mb-2">Customer Demographics</h2>
          <Pie 
            data={pieChartData} 
            options={{ 
              responsive: true, 
              maintainAspectRatio: false, // Changed to false for better height control
              plugins: { legend: { position: 'top' } },
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
