import React from "react";
import "./ProductCard.css";

interface ProductCardProps {
  image: string;
  price: string;
  label: string;
  description: string;
  inStock: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  price,
  label,
  description,
  inStock,
}) => {
  return (
    <div className="product-card">
      <img src={image} alt={label} className="product-image" />
      <h2>{label}</h2>
      <p>{description}</p>
      <p>{price}</p>
      <p>{inStock ? "In Stock" : "Out of Stock"}</p>
      <button>One-Click Buy</button>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
