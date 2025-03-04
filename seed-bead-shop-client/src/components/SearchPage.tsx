import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../ProductCard';
import { fetchProducts } from '../services/apiService';
import { Product } from '../types';

const SearchPage: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [products, setProducts] = useState<Product[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
	const [color, setColor] = useState<string>('');
	const [category, setCategory] = useState<string>('');

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const minPrice = params.get('minPrice');
		const maxPrice = params.get('maxPrice');
		const color = params.get('color');
		const category = params.get('category');

		if (minPrice && maxPrice) {
			setPriceRange([Number(minPrice), Number(maxPrice)]);
		}
		if (color) {
			setColor(color);
		}
		if (category) {
			setCategory(category);
		}
	}, [location.search]);

	useEffect(() => {
		const loadProducts = async () => {
			try {
				const products = await fetchProducts();
				setProducts(products);
				setFilteredProducts(products);
			} catch (error) {
				console.error('Error fetching products:', error);
			}
		};

		loadProducts();
	}, []);

	const handleFilterChange = useCallback(() => {
		let filtered = products;

		filtered = filtered.filter(
			(product) => product.price >= priceRange[0] && product.price <= priceRange[1],
		);

		if (color) {
			filtered = filtered.filter((product) =>
				product.color.toLowerCase().includes(color.toLowerCase()),
			);
		}

		if (category) {
			filtered = filtered.filter((product) =>
				product.category.toLowerCase().includes(category.toLowerCase()),
			);
		}

		setFilteredProducts(filtered);

		const params = new URLSearchParams();
		params.set('minPrice', priceRange[0].toString());
		params.set('maxPrice', priceRange[1].toString());
		if (color) {
			params.set('color', color);
		}
		if (category) {
			params.set('category', category);
		}
		navigate({ search: params.toString() });
	}, [products, priceRange, color, category, navigate]);

	useEffect(() => {
		handleFilterChange();
	}, [priceRange, color, category, handleFilterChange]);

	return (
		<div className="search-page flex flex-row flex-start gap-4 p-4 h-full w-full">
			<div id="search-controls" className="flex flex-col gap-4">
				<div className="price-range">
					<h3>Price Range</h3>
					<div className="flex flex-row gap-2">
						<input
							type="number"
							value={priceRange[0]}
							onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
							placeholder="Min Price"
							min={0}
							className="w-20"
						/>
						to
						<input
							type="number"
							value={priceRange[1]}
							onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
							placeholder="Max Price"
							min={0}
							className="w-20"
						/>
					</div>
				</div>
				<div className="color-filter">
					<h3>Color</h3>
					<input
						type="text"
						value={color}
						onChange={(e) => setColor(e.target.value)}
						placeholder="Color"
					/>
				</div>
				<div className="category-filter">
					<h3>Category</h3>
					<select value={category} onChange={(e) => setCategory(e.target.value)}>
						<option value="">All</option>
						<option value="earring">Earring</option>
						<option value="necklace">Necklace</option>
						<option value="bracelet">Bracelet</option>
					</select>
				</div>
			</div>
			<div
				id="product-grid"
				className="flex flex-row flex-wrap gap-4 justify-start items-start"
			>
				{filteredProducts.map((product) => (
					<ProductCard key={product.id} product={product} onImageClick={() => {}} />
				))}
			</div>
		</div>
	);
};

export default SearchPage;
