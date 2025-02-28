import React, { useCallback, useEffect, useState } from 'react';
import ProductCard from '../ProductCard';
import { fetchProducts } from '../services/apiService';
import { Product } from '../types';

const SearchPage: React.FC = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
	const [color, setColor] = useState<string>('');
	const [type, setType] = useState<string>('');

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
				product.label.toLowerCase().includes(color.toLowerCase()),
			);
		}

		if (type) {
			filtered = filtered.filter((product) =>
				product.label.toLowerCase().includes(type.toLowerCase()),
			);
		}

		setFilteredProducts(filtered);
	}, [products, priceRange, color, type]);

	useEffect(() => {
		handleFilterChange();
	}, [priceRange, color, type, handleFilterChange]);

	return (
		<div className="search-page flex flex-row gap-4 p-4 h-full w-full">
			<div className="controls flex flex-col gap-4 w-1/4">
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
				<div className="type-filter">
					<h3>Type</h3>
					<select value={type} onChange={(e) => setType(e.target.value)}>
						<option value="">All</option>
						<option value="earring">Earring</option>
						<option value="necklace">Necklace</option>
						<option value="bracelet">Bracelet</option>
					</select>
				</div>
			</div>
			<div className="product-grid grid grid-cols-3 gap-4 w-3/4">
				{filteredProducts.map((product) => (
					<ProductCard key={product.id} product={product} onImageClick={() => {}} />
				))}
			</div>
		</div>
	);
};

export default SearchPage;
