import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Checkout from './components/Checkout';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import SearchPage from './components/SearchPage';
import ShoppingCart from './components/ShoppingCart';
import Header from './Header';
import { CartItem, Product } from './types';

const App: React.FC = () => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [isCartOpen, setCartOpen] = useState(false);

	useEffect(() => {
		setTheme();
	}, []);

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

	const setTheme = () => {
		document.documentElement.classList.toggle(
			'dark',
			localStorage.theme === 'dark' ||
				(!('theme' in localStorage) &&
					window.matchMedia('(prefers-color-scheme: dark)').matches),
		);
	};

	const handleDarkModeToggle = () => {
		localStorage.theme = localStorage.theme === 'dark' ? 'light' : 'dark';
		setTheme();
	};

	const handleCloseCart = () => {
		setCartOpen(false);
	};

	return (
		<Router>
			<div
				className=" flex flex-col items-center justify-start px-4 min-h-screen w-screen
			bg-teal-50 text-gunmetal dark:bg-gunmetal dark:text-uranian-blue font-medium"
			>
				<Header shoppingCartClick={handleToggleCart} darkModeClick={handleDarkModeToggle} />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route
						path="/product/:id"
						element={<ProductPage onAddToCart={handleAddToCart} />}
					/>
					<Route path="/search/" element={<SearchPage />} />
					<Route path="/checkout" element={<Checkout items={cartItems} />} />
				</Routes>
				<ShoppingCart
					items={cartItems}
					onRemove={handleRemoveFromCart}
					isOpen={isCartOpen}
					onClose={handleCloseCart}
				/>
			</div>
		</Router>
	);
};

export default App;
