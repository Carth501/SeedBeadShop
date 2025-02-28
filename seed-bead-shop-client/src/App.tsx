import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import ProductPage from './components/ProductPage';
import ShoppingCart from './components/ShoppingCart';
import ImagePanelCycle from './components/ShowcasePanelCycle';
import Header from './Header';
import ImageGallery from './ImageGallery';
import ImageModal from './ImageModal';
import ProductCard from './ProductCard';
import { fetchProducts } from './services/apiService';
import { CartItem, Product } from './types';

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
			const existingItem = prevItems.find((item) => item.product.id === product.id);
			if (existingItem) {
				return prevItems.map((item) =>
					item.product.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item,
				);
			} else {
				return [...prevItems, { product: product, quantity: 1 }];
			}
		});
		setCartOpen(true);
	};

	const handleRemoveFromCart = (id: number) => {
		setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== id));
	};

	const handleToggleCart = () => {
		setCartOpen((prevOpen) => !prevOpen);
	};

	return (
		<Router>
			<div className="w-full h-full flex flex-col items-center">
				<Header shoppingCartClick={handleToggleCart} />
				<Routes>
					<Route
						path="/"
						element={
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
										<ProductCard
											key={index}
											product={product}
											onImageClick={handleImageClick}
										/>
									))}
								</div>
								<ImageModal
									images={currentImages}
									isOpen={isModalOpen}
									onClose={handleCloseModal}
								/>
							</div>
						}
					/>
					<Route
						path="/product/:id"
						element={<ProductPage products={products} onAddToCart={handleAddToCart} />}
					/>
				</Routes>
				<ShoppingCart
					items={cartItems}
					onRemove={handleRemoveFromCart}
					isOpen={isCartOpen}
				/>
			</div>
		</Router>
	);
}

export default App;
