import React ,{useState , useEffect} from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [categories , setCategory] = useState([])
  const navigate = useNavigate() ;

  useEffect(()=>{
    async function FetchSepCat() {
      const res = await axios.get('/api/v1/admin/GetAllSpecialCategory')
      setCategory(res.data.allSepicalCategory)
    }
    FetchSepCat()
  },[])

function handleCategoryClick(categoryId, name) {
 
  if (name.toLowerCase() === "fashion") {
    navigate(`/fashion/${categoryId}/${name}`);
  } else if (name.toLowerCase() === "mobile") {
    navigate(`/mobile/${categoryId}/${name}`);
  } else {
    navigate("/ProductList");
  }
}

  return (
    <div className="bg-gray-100 pt-20">
      {/* Horizontal Scroll Wrapper for small screens */}
      <div className="flex lg:justify-around overflow-x-scroll scrollbar-hide space-x-6 px-4" >
        {categories.map((category) => (
          <div className="text-center min-w-[80px]" key={category._id}>
            <img
            onClick={() => handleCategoryClick(category._id,category.name)}
              src={category.images}
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
