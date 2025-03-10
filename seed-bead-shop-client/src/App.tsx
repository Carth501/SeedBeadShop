import { useEffect, useState } from 'react';
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

	return (
		<Router>
			<div
				className=" flex flex-col items-center pt-23 px-4 
			bg-teal-50 text-gunmetal dark:bg-gunmetal dark:text-uranian-blue"
			>
				<Header shoppingCartClick={handleToggleCart} darkModeClick={handleDarkModeToggle} />
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
