import React, { useEffect, useRef, useState } from 'react';
import ImageGallery from '../ImageGallery';
import ImageModal from '../ImageModal';
import ProductCard from '../ProductCard';
import { fetchProducts } from '../services/apiService';
import { Product } from '../types';
import AboutMe from './AboutMe';
import CategoriesBar from './CategoriesBar';
import ImagePanelCycle from './ShowcasePanelCycle';

const HomePage: React.FC = () => {
	const [isModalOpen, setModalOpen] = useState(false);
	const [currentImages, setCurrentImages] = useState<string[]>([]);
	const [products, setProducts] = useState<Product[]>([]);
	const modalRef = useRef<HTMLDivElement>(null);
	const triggerButtonRef = useRef<HTMLButtonElement | null>(null);

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
		triggerButtonRef.current = document.activeElement as HTMLButtonElement;
		modalRef.current?.focus();
	};

	const handleCloseModal = () => {
		setModalOpen(false);
		if (triggerButtonRef.current) {
			triggerButtonRef.current.focus();
		}
	};

	return (
		<div className="flex flex-col items-stretch">
			<CategoriesBar />
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
			<AboutMe />
			<div ref={modalRef} role="dialog" aria-modal="true" tabIndex={-1}>
				<ImageModal
					images={currentImages}
					isOpen={isModalOpen}
					onClose={handleCloseModal}
				/>
			</div>
		</div>
	);
};

export default HomePage;
