import React from 'react';
import { useParams } from 'react-router-dom';

interface Product {
	id: number;
	images: string[];
	price: string;
	label: string;
	description: string;
	inStock: boolean;
}

interface ProductPageProps {
	products: Product[];
	onAddToCart: (product: Product) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ products, onAddToCart }) => {
	const { id } = useParams<{ id: string }>();
	const product = products.find((p) => p.id === parseInt(id));

	if (!product) {
		return <div>Product not found</div>;
	}

	return (
		<div className="product-page p-4">
			<h1 className="text-2xl font-bold mb-4">{product.label}</h1>
			<img src={product.images[0]} alt={product.label} className="w-full h-auto mb-4" />
			<p className="mb-4">{product.description}</p>
			<p className="mb-4">Price: {product.price}</p>
			<p className="mb-4">In Stock: {product.inStock ? 'Yes' : 'No'}</p>
			<button
				className="bg-blue-500 text-white py-2 px-4 rounded"
				onClick={() => onAddToCart(product)}
			>
				Add to Cart
			</button>
		</div>
	);
};

export default ProductPage;
