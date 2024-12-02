import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  // Slick slider settings with autoplay
  const settings = {
    dots: true,  // Show dots below the slides
    infinite: true,  // Infinite loop sliding
    speed: 500,  // Slide transition speed in milliseconds
    slidesToShow: 1,  // Number of slides to show at a time
    slidesToScroll: 1,  // Number of slides to scroll at once
    autoplay: true,  // Enable autoplay
    autoplaySpeed: 3000,  // Auto-slide every 3 seconds
    arrows: false,  // Disable navigation arrows
  };

  // Banner content with temporary images
  const banners = [
    {
      title: 'Sale is Live!',
      description: 'The Big Billion Days',
      img: 'https://via.placeholder.com/1200x400?text=Big+Sale', // Placeholder image
    },
    {
      title: 'Mega Deals!',
      description: 'Up to 70% Off on Electronics',
      img: 'https://via.placeholder.com/1200x400?text=Electronics+Discount', // Placeholder image
    },
    {
      title: 'Fashion Fiesta!',
      description: 'Flat 50% Off on Apparel',
      img: 'https://via.placeholder.com/1200x400?text=Fashion+Sale', // Placeholder image
    },
  ];

  return (
    <div className="w-full overflow-hidden">
      {/* Slick Slider */}
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index} className="relative">
            <img src={banner.img} alt={banner.title} className="w-full h-64 object-cover" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
              <h2 className="text-3xl font-bold">{banner.title}</h2>
              <p className="mt-2">{banner.description}</p>
              <button className="bg-orange-500 mt-4 py-2 px-4 rounded">Shop Now</button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
