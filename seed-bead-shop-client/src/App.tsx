import { useState } from 'react';
import './App.css';
import Header from './Header';
import ImageModal from './ImageModal';
import ProductCard from './ProductCard';
import earrings_1 from './assets/earrings_1.png';
import earrings_2 from './assets/earrings_2.png';
import earrings_3 from './assets/earrings_3.png';
import earrings_3_1 from './assets/earrings_3_1.jpg';
import earrings_3_2 from './assets/earrings_3_2.jpg';
import earrings_3_3 from './assets/earrings_3_3.jpg';
import Blossoms from './blossoms/blossoms';

function App() {
	const [isModalOpen, setModalOpen] = useState(false);
	const [currentImages, setCurrentImages] = useState<string[]>([]);

	const products = [
		{
			images: [earrings_1],
			price: '$10.00',
			label: 'Product 1',
			description: 'Description of product 1',
			inStock: false,
		},
		{
			images: [earrings_2],
			price: '$20.00',
			label: 'Product 2',
			description: 'Description of product 2',
			inStock: false,
		},

		{
			images: [earrings_3, earrings_3_1, earrings_3_2, earrings_3_3],
			price: '$30.00',
			label: 'Product 3',
			description: 'Description of product 3',
			inStock: false,
		},
	];

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
			<div
				className="product-row flex justify-center overflow-x-auto overflow-y-visible 
			p-4 gap-4 w-screen"
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
