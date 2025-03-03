import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import SearchPage from './components/SearchPage';
import ShoppingCart from './components/ShoppingCart';
import Header from './Header';
import { CartItem, Product } from './types';

function App() {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [isCartOpen, setCartOpen] = useState(false);

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
			<div className="w-[100vw] h-[100vh] flex flex-col items-center pt-23 px-4">
				<Header shoppingCartClick={handleToggleCart} />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route
						path="/product/:id"
						element={<ProductPage onAddToCart={handleAddToCart} />}
					/>
					<Route path="/search/" element={<SearchPage />} />
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
