const BestDeals = () => {
  const electronics = [
    { name: 'Canon Camera', img: 'https://via.placeholder.com/200', price: 'From ₹49,900' },
    { name: 'Apple AirPods', img: 'https://via.placeholder.com/200', price: 'From ₹9,999' },
    { name: 'Smartwatch', img: 'https://via.placeholder.com/200', price: 'From ₹3,499' },
    { name: 'Smartwatch', img: 'https://via.placeholder.com/200', price: 'From ₹3,499' },
    { name: 'Smartwatch', img: 'https://via.placeholder.com/200', price: 'From ₹3,499' },
    { name: 'Smartwatch', img: 'https://via.placeholder.com/200', price: 'From ₹3,499' },
  ];

  const smartphones = [
    { name: 'iPhone 13', img: 'https://via.placeholder.com/200', price: 'From ₹69,900' },
    { name: 'Samsung Galaxy S21', img: 'https://via.placeholder.com/200', price: 'From ₹49,999' },
    { name: 'OnePlus 9', img: 'https://via.placeholder.com/200', price: 'From ₹39,999' },
    { name: 'Xiaomi Mi 11', img: 'https://via.placeholder.com/200', price: 'From ₹29,999' },
    { name: 'Realme GT', img: 'https://via.placeholder.com/200', price: 'From ₹27,999' },
    { name: 'Realme GT', img: 'https://via.placeholder.com/200', price: 'From ₹27,999' },
  ];

  const clothing = [
    { name: 'Men\'s T-Shirts', img: 'https://via.placeholder.com/200', price: 'From ₹399' },
    { name: 'Men\'s T-Shirts', img: 'https://via.placeholder.com/200', price: 'From ₹399' },
    { name: 'Women\'s Dresses', img: 'https://via.placeholder.com/200', price: 'From ₹799' },
    { name: 'Kids\' Clothing', img: 'https://via.placeholder.com/200', price: 'From ₹299' },
    { name: 'Jeans', img: 'https://via.placeholder.com/200', price: 'From ₹999' },
    { name: 'Jackets', img: 'https://via.placeholder.com/200', price: 'From ₹1,499' },
  ];

  return (
    <div className="p-4">
      {/* Best of Electronics Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Best of Electronics</h3>
        <div className="scroll-container flex space-x-4 overflow-x-auto">
          {electronics.map((product, index) => (
            <div key={index} className="min-w-[200px] bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src={product.img} alt={product.name} className="w-full h-40 object-cover rounded-t-lg" />
              <div className="p-2 text-center">
                <h4 className="font-semibold text-sm">{product.name}</h4>
                <p className="text-green-500 font-bold text-sm">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deals on Smartphones Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Deals on Smartphones</h3>
        <div className="scroll-container flex space-x-4 overflow-x-auto">
          {smartphones.map((product, index) => (
            <div key={index} className="min-w-[200px] bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src={product.img} alt={product.name} className="w-full h-40 object-cover rounded-t-lg" />
              <div className="p-2 text-center">
                <h4 className="font-semibold text-sm">{product.name}</h4>
                <p className="text-green-500 font-bold text-sm">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deals on Clothing Section */}
      <div>
        <h3 className="text-xl font-bold mb-4">Deals on Clothing</h3>
        <div className="scroll-container flex space-x-4 overflow-x-auto">
          {clothing.map((product, index) => (
            <div key={index} className="min-w-[200px] bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src={product.img} alt={product.name} className="w-full h-40 object-cover rounded-t-lg" />
              <div className="p-2 text-center">
                <h4 className="font-semibold text-sm">{product.name}</h4>
                <p className="text-green-500 font-bold text-sm">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
