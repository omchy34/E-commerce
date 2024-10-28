import { FaSearch, FaShoppingCart, FaHeart, FaHome } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import axios from "axios";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [AccessToken, setAccessToken] = useState("");
  const [Name, setName] = useState("");
  // FirstName
  const firstName = Name.split(" ")[0];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };


  useEffect(() => {
    async function userData() {
      const res = await axios.get("/api/v1/users/userData", {
        withCredentials: true,
      });

      console.log(res);
      setAccessToken(res.data.userData.AccessToken);
      setName(res.data.userData.FullName);
    }

    userData();

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial state

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-700 text-white py-3 shadow-lg fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-2 md:px-6">
        <div className="flex items-center space-x-1 md:space-x-2 text-lg md:text-2xl font-semibold">
          <Link to="/">
            <img src={Logo} alt="" className="mx-auto h-8 text-black" />
          </Link>
        </div>

        <div className="flex-grow mx-2 md:mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for Products, Brands and More"
              className="w-full p-3 rounded-full text-black focus:outline-none shadow-md placeholder-gray-500 focus:ring-2 focus:ring-yellow-500 transition duration-200"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-500 p-2 rounded-full hover:bg-yellow-600 transition duration-300">
              <FaSearch className="text-white" size={20} />
            </button>
          </div>
        </div>

        {/* Right: Login, Cart, More Dropdown */}
        <div className="flex space-x-4 items-center text-sm md:text-base font-medium">
          {/* Dropdown Toggle Icon */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="md:hidden flex items-center space-x-2 hover:text-yellow-300 cursor-pointer transition duration-200"
            >
              <span className="text-sm">{firstName}</span>
              <MdManageAccounts size={28} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && isMobile && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-10">
                <Link
                  to="/"
                  className="flex items-center p-2 hover:bg-gray-200"
                >
                  <FaHome size={22} />
                  <span className="ml-2">Home</span>
                </Link>
                {AccessToken ? (
                  <Link
                    to="/Profile"
                    className="flex items-center p-2 hover:bg-gray-200"
                  >
                    <MdManageAccounts size={22} />
                    <span className="ml-2">Login</span>
                  </Link>
                ) : (
                  <Link
                    to="RegistrationForm"
                    className="flex items-center p-2 hover:bg-gray-200"
                  >
                    <MdManageAccounts size={22} />
                    <span className="ml-2">Register</span>
                  </Link>
                )}

                <Link
                  to="/cart"
                  className="flex items-center p-2 hover:bg-gray-200"
                >
                  <FaShoppingCart size={22} />
                  <span className="ml-2">Cart</span>
                </Link>
                <Link
                  to="/WishList"
                  className="flex items-center p-2 hover:bg-gray-200"
                >
                  <FaHeart size={22} />
                  <span className="ml-2">Wishlist</span>
                </Link>
              </div>
            )}
          </div>

          {/* Icons for Tablet and Desktop */}
          <div className="hidden md:flex space-x-4 items-center text-sm md:text-base font-medium">
            <Link
              to="/"
              className="flex items-center space-x-2 hover:text-yellow-300 cursor-pointer transition duration-200"
            >
              <span>{firstName}</span>
              <FaHome size={22} />
            </Link>
            {AccessToken ? (
              <Link
                to="/Profile"
                className="flex items-center space-x-2 hover:text-yellow-300 cursor-pointer transition duration-200"
              >
                <MdManageAccounts size={28} />
              </Link>
            ) : (
              <Link
                to="RegistrationForm"
                className="flex items-center space-x-2 hover:text-yellow-300 cursor-pointer transition duration-200"
              >
                <MdManageAccounts size={28} />
              </Link>
            )}

            <Link
              to="/cart"
              state={{ isLoggedIn: !!AccessToken }} // Passing login state to the cart page
              className="flex items-center space-x-2 hover:text-yellow-300 cursor-pointer transition duration-200"
            >
              <FaShoppingCart size={22} />
            </Link>

            {/* Wishlist Icon */}
            <Link
              to="/WishList"
              className="flex items-center space-x-2 hover:text-red-500 cursor-pointer transition duration-200"
            >
              <FaHeart size={22} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
