const Categories = () => {
  const categories = [
    { name: 'Top Offers', img: 'https://via.placeholder.com/100' },
    { name: 'Mobiles & Tablets', img: 'https://via.placeholder.com/100' },
    { name: 'TVs & Appliances', img: 'https://via.placeholder.com/100' },
    { name: 'Electronics', img: 'https://via.placeholder.com/100' },
    { name: 'Fashion', img: 'https://via.placeholder.com/100' },
    { name: 'Beauty', img: 'https://via.placeholder.com/100' },
    { name: 'Home & Kitchen', img: 'https://via.placeholder.com/100' },
    { name: 'Furniture', img: 'https://via.placeholder.com/100' },
    { name: 'Travel', img: 'https://via.placeholder.com/100' },
    { name: 'Grocery', img: 'https://via.placeholder.com/100' },
  ];

  return (
    <div className="bg-gray-100 pt-20">
      {/* Horizontal Scroll Wrapper for small screens */}
      <div className="flex lg:justify-around overflow-x-scroll scrollbar-hide space-x-6 px-4">
        {categories.map((category) => (
          <div className="text-center min-w-[80px]" key={category.name}>
            <img
              src={category.img}
              alt={category.name}
              className="w-16 h-16 mx-auto"
            />
            <p className="text-sm mt-2">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
