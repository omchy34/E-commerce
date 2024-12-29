import React, { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]); 
  const [loading, setLoading] = useState(false); 

  const handleSearch = async (e) => {
    const searchValue = e.target.value;
    setQuery(searchValue);

    if (searchValue.trim() === "") {
      setSuggestions([]); 
      return;
    }

    console.log("Search Query:", searchValue); 

    try {
      setLoading(true);
      const response = await axios.get(
        `https://e-commerceserver-uu0f.onrender.com/api/v1/admin/search-product/${encodeURIComponent(searchValue)}`
      );
      console.log("API Response:", response.data); 
      setSuggestions(response.data.suggestions || []);
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex-grow mx-2 md:mx-8">
     
      <div className="relative">
        <input
          type="text"
          placeholder="Search for Products, Brands, and More"
          value={query}
          onChange={handleSearch}
          className="w-full p-3 rounded-full text-black focus:outline-none shadow-md placeholder-gray-500 focus:ring-2 focus:ring-yellow-500 transition duration-200"
        />
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-500 p-2 rounded-full hover:bg-yellow-600 transition duration-300"
          disabled={loading}
        >
          <FaSearch className="text-white" size={20} />
        </button>
      </div>

      
      {query.trim() !== "" && suggestions.length > 0 && (
        <ul className="absolute left-0 w-full mt-1 bg-white text-black rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion._id}
              onClick={() => (window.location.href = `/ProductDetails/${suggestion._id}`)}
              className="p-3 hover:bg-gray-100 cursor-pointer transition duration-200"
            >
              <span className="font-semibold">{suggestion.ProductName}</span> -{" "}
              <span className="text-sm text-gray-600">{suggestion.Brand}</span>
            </li>
          ))}
        </ul>
      )}

     
      {query.trim() !== "" && suggestions.length === 0 && !loading && (
        <div className="absolute left-0 w-full mt-1 bg-white text-black rounded-lg shadow-lg z-50 p-3 text-center">
          No results found
        </div>
      )}
    </div>
  );
};

export default Search;
