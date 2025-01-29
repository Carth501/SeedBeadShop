import React from 'react';

interface ProductCardProps {
	image: string;
	price: string;
	label: string;
	description: string;
	inStock: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, price, label, description, inStock }) => {
	return (
		<div className="border border-gray-300 rounded-lg p-4 w-[200px] shadow-md flex flex-col items-stretch">
			<img
				src={image}
				alt={label}
				className="w-full h-auto aspect-square object-cover rounded"
			/>
			<h2 className="text-left m-0">{label}</h2>
			<p className="text-left m-0">{description}</p>
			<p className="text-left m-0">{price}</p>
			<p className="text-left m-0">{inStock ? 'In Stock' : 'Out of Stock'}</p>
			<button className="mt-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">
				One-Click Buy
			</button>
			<button className="mt-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">
				Add to Cart
			</button>
		</div>
	);
};

export default ProductCard;
