import React, { useEffect, useState } from 'react';
import ImageGallery from '../ImageGallery';
import ImageModal from '../ImageModal';
import ProductCard from '../ProductCard';
import { fetchProducts } from '../services/apiService';
import { Product } from '../types';
import ImagePanelCycle from './ShowcasePanelCycle';

const HomePage: React.FC = () => {
	const [isModalOpen, setModalOpen] = useState(false);
	const [currentImages, setCurrentImages] = useState<string[]>([]);
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		const loadProducts = async () => {
			try {
				const productsData = await fetchProducts();
				setProducts(productsData);
			} catch (error) {
				console.error('Error loading products:', error);
			}
		};

		loadProducts();
	}, []);

	const handleImageClick = (id: number) => {
		setCurrentImages(products[id].images);
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
	};

	return (
		<div className="flex flex-col items-stretch">
			<ImagePanelCycle />
			<div className="h-40 flex justify-center items-center">
				<ImageGallery images={products[2]?.images || []} />
			</div>
			<div
				className="product-row flex justify-center overflow-x-auto
                overflow-y-visible read-the-docsp-4 gap-4 w-screen p-4"
			>
				{products.map((product, index) => (
					<ProductCard key={index} product={product} onImageClick={handleImageClick} />
				))}
			</div>
			<ImageModal images={currentImages} isOpen={isModalOpen} onClose={handleCloseModal} />
		</div>
	);
};

export default HomePage;
