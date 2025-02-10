import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Blossoms from './blossoms/blossoms';
import Header from './Header';
import ImageModal from './ImageModal';
import ProductCard from './ProductCard';

interface Product {
	images: string[];
	price: string;
	label: string;
	description: string;
	inStock: boolean;
}

function App() {
	const [isModalOpen, setModalOpen] = useState(false);
	const [currentImages, setCurrentImages] = useState<string[]>([]);
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		axios
			.get('http://127.0.0.1:5000/api/products')
			.then((response) => {
				setProducts(response.data);
			})
			.catch((error) => {
				console.error('Error fetching products:', error);
			});
	}, []);

	const handleImageClick = (id: number) => {
		setCurrentImages(products[id].images);
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
	};

	return (
		<>
			<Header />
			{/* <ImageGallery images={products[2].images} /> */}
			<div
				className="product-row flex justify-center overflow-x-auto overflow-y-visible 
			read-the-docsp-4 gap-4 w-screen p-4"
			>
				{products.map((product, index) => (
					<ProductCard
						key={index}
						id={index}
						price={product.price}
						label={product.label}
						description={product.description}
						inStock={product.inStock}
						images={product.images}
						onImageClick={handleImageClick}
					/>
				))}
			</div>
			<div className="absolute top-0 left-0 w-[95%] h-screen -z-1">
				<Blossoms />
			</div>
			<ImageModal images={currentImages} isOpen={isModalOpen} onClose={handleCloseModal} />
		</>
	);
}

export default App;
