import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";


const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    adaptiveHeight: true,  // Make the height adaptive to content
    pauseOnHover: true,    // Pause autoplay on hover
  };

  useEffect(() => {
    async function fetchBanners() {
      try {
        const res = await axios.get("/api/v1/admin/GetAllBanner");
        if (res.data && res.data.allBanners) {
          setBanners(res.data.allBanners);
        } else {
          throw new Error("Unexpected response structure");
        }
      } catch (err) {
        console.error("Error fetching banners:", err);
        setError("Failed to load banners.");
      } finally {
        setLoading(false);
      }
    }

    fetchBanners();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading banners...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="w-full overflow-hidden banner-container">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={`${banner._id}-${index}`} className="relative w-full">
            <img
              src={banner.images || "https://via.placeholder.com/1920x1080"}
              alt="Banner"
              className="w-full banner-image"
              style={{
                objectPosition: "center",
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
