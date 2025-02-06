import React, { useState } from 'react';
import ImageModal from './ImageModal';
import ProductButton from './ProductButton';

interface ProductCardProps {
	id: number;
	images: string[];
	price: string;
	label: string;
	description: string;
	inStock: boolean;
	onImageClick: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
	id,
	images,
	price,
	label,
	description,
	inStock,
	onImageClick,
}) => {
	const [isModalOpen, setModalOpen] = useState(false);

	const handleCloseModal = () => {
		setModalOpen(false);
	};

	return (
		<div
			className={`product-card border border-gray-300 rounded-lg p-4 w-[200px] 
			shadow-md flex flex-col items-stretch shrink-0 background ${!isModalOpen ? 'hover' : ''}`}
		>
			<img
				src={images[0]}
				alt={label}
				className="w-full h-auto aspect-square object-cover rounded hover:scale-105 
				transition-transform duration-300"
				onClick={() => onImageClick(id)}
			/>
			<h2 className="text-left m-0">{label}</h2>
			<p className="text-left m-0">{description}</p>
			<p className="text-left m-0">{price}</p>
			<p className="text-left m-0">{inStock ? 'In Stock' : 'Out of Stock'}</p>
			<ProductButton label="One-Click Buy" onClick={() => console.log('One-Click Buy')} />
			<ProductButton label="Add to Cart" onClick={() => console.log('Add to Cart')} />
			<ImageModal images={images} isOpen={isModalOpen} onClose={handleCloseModal} />
		</div>
	);
};

export default ProductCard;
