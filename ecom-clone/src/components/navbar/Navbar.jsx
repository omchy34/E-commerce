import { FaSearch, FaShoppingCart, FaHeart, FaHome } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import Cookies from "js-cookie";
import Search from "./Search";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [name, setName] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const updateAuthState = () => {
      const token = Cookies.get("AccessToken");
      const userName = Cookies.get("Data");
      setAccessToken(token || "");
      setName(userName || "");
    };

   
    updateAuthState();
    const interval = setInterval(updateAuthState, 1000); 

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };


    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-700 text-white py-3 shadow-lg fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-2 md:px-6">
        {/* Logo */}
        <div className="flex items-center space-x-1 md:space-x-2 text-lg md:text-2xl font-semibold">
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-8" />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-grow mx-2 md:mx-8">
          <Search/>
        </div>

        {/* Navbar Items */}
        <div className="flex space-x-4 items-center text-sm md:text-base font-medium">
          {isMobile ? (
            <div className="relative">
              {/* Mobile View */}
              {accessToken && name ? (
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 hover:text-yellow-300 cursor-pointer transition duration-200"
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen}
                >
                  <span>{name.split(" ")[0]}</span>
                  <MdManageAccounts size={28} />
                  
                </button>
              ) : (
                <Link
                  to="/RegistrationForm"
                  className="flex items-center hover:text-yellow-300 cursor-pointer transition duration-200"
                >
                  <MdManageAccounts size={28} />
                  <span className="ml-2">Register</span>
                </Link>
              )}

              {/* Dropdown Menu */}
              {isDropdownOpen && accessToken && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-10">
                  <Link to="/" className="flex items-center p-2 hover:bg-gray-200">
                    <FaHome size={22} />
                    <span className="ml-2">Home</span>
                  </Link>
                  <Link
                    to="/Profile"
                    className="flex items-center p-2 hover:bg-gray-200"
                  > 
                    <MdManageAccounts size={28} />
                    Profile
                  </Link>
                  <Link to="/cart" className="flex items-center p-2 hover:bg-gray-200">
                    <FaShoppingCart size={22} />
                    <span className="ml-2">Cart</span>
                  </Link>
                  <Link to="/WishList" className="flex items-center p-2 hover:bg-gray-200">
                    <FaHeart size={22} />
                    <span className="ml-2">Wishlist</span>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex space-x-4 items-center">
              {/* Desktop View */}
              {accessToken && name ? (
                <>
                  <Link
                    to="/"
                    className="flex items-center space-x-2 hover:text-yellow-300 cursor-pointer transition duration-200"
                  >
                    <span>{name.split(" ")[0]}</span>
                    <FaHome size={22} />
                  </Link>
                  <Link
                    to="/Profile"
                    className="flex items-center space-x-2 hover:text-red-500 cursor-pointer transition duration-200"
                  > 
                    <MdManageAccounts size={28} />
                    
                  </Link>
                  <Link
                    to="/cart"
                    className="flex items-center space-x-2 hover:text-yellow-300 cursor-pointer transition duration-200"
                  >
                    <FaShoppingCart size={22} />
                  </Link>
                  <Link
                    to="/WishList"
                    className="flex items-center space-x-2 hover:text-red-500 cursor-pointer transition duration-200"
                  >
                    <FaHeart size={22} />
                  </Link>
                </>
              ) : (
                <Link
                  to="/RegistrationForm"
                  className="flex items-center space-x-2 hover:text-yellow-300 cursor-pointer transition duration-200"
                >
                  <MdManageAccounts size={28} />
                  <span>Register</span>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
