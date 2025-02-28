import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageModal from './ImageModal';
import ProductButton from './ProductButton';
import { fetchImage } from './services/apiService';

interface ProductCardProps {
	id: number;
	price: string;
	label: string;
	description: string;
	inStock: boolean;
	images: string[];
	onImageClick: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
	id,
	price,
	label,
	description,
	inStock,
	images,
	onImageClick,
}) => {
	const [isModalOpen, setModalOpen] = useState(false);
	const [imageSrc, setImageSrc] = useState<string | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const loadImage = async () => {
			if (images.length > 0) {
				try {
					const imageUrl = await fetchImage(images[0]);
					setImageSrc(imageUrl);
				} catch (error) {
					console.error('Error fetching image:', error);
				}
			}
		};

		loadImage();
	}, [images]);

	const handleCloseModal = () => {
		setModalOpen(false);
	};

	const handleView = () => {
		navigate(`/product/${id}`);
	};

	return (
		<div
			className={`border border-gray-300 rounded-lg p-4 w-[200px] h-100 transition-all duration-300
            shadow-md flex flex-col items-stretch shrink-0 background hover:scale-105 hover:shadow-lg
            justify-between
            ${!isModalOpen ? 'hover' : ''}`}
		>
			<div>
				{imageSrc && (
					<img
						src={imageSrc}
						alt={label}
						className="w-full h-auto aspect-square object-cover rounded hover:scale-105 
                        transition-transform duration-300"
						onClick={() => onImageClick(id)}
					/>
				)}
				<h2 className="text-left m-0">{label}</h2>
				<p className="text-left m-0">{description}</p>
				<p className="text-left m-0">{price}</p>
				<p className="text-left m-0">{inStock ? 'In Stock' : 'Out of Stock'}</p>
			</div>
			<div className="flex flex-col items-stretch">
				<ProductButton label="View" onClick={handleView} />
			</div>
			<ImageModal images={images} isOpen={isModalOpen} onClose={handleCloseModal} />
		</div>
	);
};

export default ProductCard;
