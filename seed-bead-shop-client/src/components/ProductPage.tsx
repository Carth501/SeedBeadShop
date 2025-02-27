import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchImage } from '../services/apiService';

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
	const product = id ? products.find((p) => p.id === parseInt(id)) : undefined;
	const [imageUrls, setImageUrls] = useState<string[]>([]);

	useEffect(() => {
		const loadImages = async () => {
			if (product && product.images.length > 0) {
				try {
					const urls = await Promise.all(
						product.images.map((image) => fetchImage(image)),
					);
					setImageUrls(urls);
				} catch (error) {
					console.error('Error fetching images:', error);
				}
			}
		};

		loadImages();
	}, [product]);

	if (!product) {
		return <div>Product not found</div>;
	}

	return (
		<div className="product-page p-4 flex flex-row gap-4">
			{imageUrls.length > 0 && (
				<img src={imageUrls[0]} alt={product.label} className="w-full h-auto mb-4" />
			)}
			<div>
				<h1 className="text-2xl font-bold mb-4">{product.label}</h1>
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
		</div>
	);
};

export default ProductPage;
