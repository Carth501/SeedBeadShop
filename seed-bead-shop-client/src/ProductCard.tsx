import React from 'react';
import ProductButton from './ProductButton';

interface ProductCardProps {
	image: string;
	price: string;
	label: string;
	description: string;
	inStock: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, price, label, description, inStock }) => {
	return (
		<div className="product-card border border-gray-300 rounded-lg p-4 w-[200px] shadow-md flex flex-col items-stretch shrink-0 background">
			<img
				src={image}
				alt={label}
				className="w-full h-auto aspect-square object-cover rounded"
			/>
			<h2 className="text-left m-0">{label}</h2>
			<p className="text-left m-0">{description}</p>
			<p className="text-left m-0">{price}</p>
			<p className="text-left m-0">{inStock ? 'In Stock' : 'Out of Stock'}</p>
			<ProductButton label="One-Click Buy" onClick={() => console.log('One-Click Buy')} />
			<ProductButton label="Add to Cart" onClick={() => console.log('Add to Cart')} />
		</div>
	);
};

export default ProductCard;
