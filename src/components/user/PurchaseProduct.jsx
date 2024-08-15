// ProductCard.jsx
import React from "react";

const PurchaseProduct = ({ product, onPurchase }) => {
  return (
    <div className="md:w-4/12 sm:w-1/2 w-full px-3 pb-4" key={product._id}>
      <div className="bg-gray-200 rounded-md w-full flex flex-col justify-center items-center">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>{product.price}</p>
        {onPurchase && (
          <button
            className="bg-gray-400 rounded-md px-3 py-1 my-3"
            onClick={() => onPurchase(product)}
          >
            Purchase
          </button>
        )}
      </div>
    </div>
  );
};

export default PurchaseProduct;
