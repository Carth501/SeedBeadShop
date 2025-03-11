import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageModal from './ImageModal';
import ProductButton from './ProductButton';
import { fetchImage } from './services/apiService';
import { Product } from './types';

interface ProductCardProps {
	product: Product;
	onImageClick: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onImageClick }) => {
	const [isModalOpen, setModalOpen] = useState(false);
	const [imageSrc, setImageSrc] = useState<string | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const loadImage = async () => {
			if (product.images.length > 0) {
				try {
					const imageUrl = await fetchImage(product.images[0]);
					setImageSrc(imageUrl);
				} catch (error) {
					console.error('Error fetching image:', error);
				}
			}
		};

		loadImage();
	}, [product.images]);

	const handleCloseModal = () => {
		setModalOpen(false);
	};

	const handleView = () => {
		navigate(`/product/${product.id}`);
	};

	return (
		<div
			className={`border rounded-lg p-4 w-50 min-h-100 transition-all duration-300
            shadow-md flex flex-col items-stretch shrink-0 background hover:scale-105 hover:shadow-lg
            justify-between border-gray-300 dark:border-sky-blue
            ${!isModalOpen ? 'hover' : ''}`}
		>
			<div>
				{imageSrc && (
					<img
						src={imageSrc}
						alt={product.label}
						className="w-full h-auto aspect-square object-cover rounded hover:scale-105 focus-visible:scale-105 
                        transition-transform duration-300"
						onClick={() => onImageClick(product.id)}
					/>
				)}
				<h2 className="text-left text-base font-bold m-0">{product.label}</h2>
				<p className="text-left text-base m-0">{product.description}</p>
				<p className="text-left text-base m-0">${product.price.toFixed(2)}</p>
				<p className="text-left text-base m-0">
					{product.inStock ? 'In Stock' : 'Out of Stock'}
				</p>
			</div>
			<div className="flex flex-col items-stretch">
				<ProductButton label="View" onClick={handleView} />
			</div>
			<ImageModal images={product.images} isOpen={isModalOpen} onClose={handleCloseModal} />
		</div>
	);
};

export default ProductCard;
