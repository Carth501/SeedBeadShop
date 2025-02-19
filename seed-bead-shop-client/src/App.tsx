import { useEffect, useState } from 'react';
import './App.css';
import ShoppingCart from './components/ShoppingCart';
import ImagePanelCycle from './components/ShowcasePanelCycle';
import Header from './Header';
import ImageGallery from './ImageGallery';
import ImageModal from './ImageModal';
import ProductCard from './ProductCard';
import { fetchProducts } from './services/apiService';

interface Product {
	id: number;
	images: string[];
	price: string;
	label: string;
	description: string;
	inStock: boolean;
}

interface CartItem {
	id: number;
	label: string;
	price: string;
	quantity: number;
}

function App() {
	const [isModalOpen, setModalOpen] = useState(false);
	const [currentImages, setCurrentImages] = useState<string[]>([]);
	const [products, setProducts] = useState<Product[]>([]);
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [isCartOpen, setCartOpen] = useState(false);

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

	const handleAddToCart = (product: Product) => {
		setCartItems((prevItems) => {
			const existingItem = prevItems.find((item) => item.id === product.id);
			if (existingItem) {
				return prevItems.map((item) =>
					item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
				);
			} else {
				return [
					...prevItems,
					{ id: product.id, label: product.label, price: product.price, quantity: 1 },
				];
			}
		});
		console.log(product);
	};

	const handleRemoveFromCart = (id: number) => {
		setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
	};

	const handleToggleCart = () => {
		setCartOpen((prevOpen) => !prevOpen);
	};

	return (
		<div className="bg-white w-full h-full flex flex-col items-center">
			<Header shoppingCartClick={handleToggleCart} />
			<div className="flex flex-col items-stretch">
				<ImagePanelCycle />
				<div className="h-40 -z-1000 flex justify-center items-center">
					<ImageGallery images={products[2]?.images || []} />
				</div>
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
							onAddToCart={() => handleAddToCart(product)}
						/>
					))}
				</div>
				<ImageModal
					images={currentImages}
					isOpen={isModalOpen}
					onClose={handleCloseModal}
				/>
				<ShoppingCart
					items={cartItems}
					onRemove={handleRemoveFromCart}
					isOpen={isCartOpen}
					onClose={handleToggleCart}
				/>
			</div>
		</div>
	);
}

export default App;
