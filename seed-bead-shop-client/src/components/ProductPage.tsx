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
	const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

	useEffect(() => {
		const loadImages = async () => {
			if (product && product.images.length > 0) {
				try {
					const urls = await Promise.all(
						product.images.map((image) => fetchImage(image)),
					);
					setImageUrls(urls);
					setCurrentImageIndex(0); // Set the first image as the main image initially
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
			<div className="flex flex-row">
				<div className="flex flex-col gap-2 overflow-y-scroll max-h-100 pr-3">
					{imageUrls.map((url, index) => (
						<img
							key={index}
							src={url}
							alt={`${product.label} preview ${index + 1}`}
							className={`w-20 h-20 object-cover cursor-pointer border border-gray-300 rounded-lg ${
								index === currentImageIndex ? 'border-blue-500' : ''
							}`}
							onClick={() => setCurrentImageIndex(index)}
						/>
					))}
				</div>
				{imageUrls.length > 0 && (
					<img
						src={imageUrls[currentImageIndex]}
						alt={product.label}
						className="w-full h-auto mb-4 max-w-150 max-h-150 rounded-lg"
					/>
				)}
			</div>
			<div className="flex flex-col">
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
