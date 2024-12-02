import React from "react";
import Card from "../Card/Card";
import { useSelector, useDispatch } from "react-redux";
import { Removefromwishlist } from "../../features/WishList/WishList.js";
import {Addtocart} from "../../features/AddToCart/AddToCart.js"

const Wishlist = () => {
  const wishlistData = useSelector((state) => state.Wishlist.Wishlist);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(Addtocart(product));
    alert(`${product.ProductName} has been added to your cart.`);
  };

  const handleRemoveFromWishlist = (product) => {
    dispatch(Removefromwishlist(product._id));
    alert(`${product.ProductName} has been removed from your wishlist.`);
  };

  return (
    <div className="container mx-auto p-4 pt-20">
      <h1 className="text-3xl font-semibold mb-6">My Wishlist</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {wishlistData.length > 0 ? (
          wishlistData.map((product) => (
            <Card
              key={product._id}
              product={product}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleRemoveFromWishlist}
              isInWishlist={true}
            />
          ))
        ) : (
          <div className="col-span-1 text-center text-gray-600">
            <p>Your wishlist is empty!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
