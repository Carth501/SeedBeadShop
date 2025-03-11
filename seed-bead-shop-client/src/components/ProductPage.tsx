import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchImage, fetchProduct } from '../services/apiService';
import { Product } from '../types';
import PrimaryButton from './PrimaryButton';

interface ProductPageProps {
	onAddToCart: (product: Product) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ onAddToCart }) => {
	const { id } = useParams<{ id: string }>();
	const [product, setProduct] = useState<Product | undefined>(undefined);
	const [imageUrls, setImageUrls] = useState<string[]>([]);
	const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

	useEffect(() => {
		const loadProduct = async () => {
			if (id) {
				try {
					const fetchedProduct = await fetchProduct(parseInt(id));
					setProduct(fetchedProduct);
				} catch (error) {
					console.error('Error fetching product:', error);
				}
			}
		};

		loadProduct();
	}, [id]);

	useEffect(() => {
		const loadImages = async () => {
			if (product && product.images.length > 0) {
				try {
					const urls = await Promise.all(
						product.images.map((image) => fetchImage(image)),
					);
					setImageUrls(urls);
					setCurrentImageIndex(0);
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
		<div className="product-page p-4 flex flex-row text-base gap-4">
			<div className="flex flex-row">
				<div className="flex flex-col gap-2 overflow-y-scroll max-h-100 pr-3">
					{imageUrls.map((url, index) => (
						<img
							key={index}
							src={url}
							alt={`${product.label} preview ${index + 1}`}
							className={`w-20 h-20 object-cover cursor-pointer border-4 rounded-lg ${
								index === currentImageIndex
									? 'border-sky-blue dark:border-uranian-blue'
									: 'border-carribean-current'
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
				<p className="mb-4">Price: ${product.price.toFixed(2)}</p>
				<p className="mb-4">In Stock: {product.inStock ? 'Yes' : 'No'}</p>
				<PrimaryButton onClick={() => onAddToCart(product)}>Add to Cart</PrimaryButton>
			</div>
		</div>
	);
};

export default ProductPage;
