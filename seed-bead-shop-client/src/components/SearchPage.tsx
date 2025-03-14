import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
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
	const [category, setCategory] = useState<string>('all');

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

		if (category && category !== 'all') {
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
			if (category !== 'all') {
				params.set('category', category);
			} else {
				params.delete('category');
			}
		}
		navigate({ search: params.toString() });
	}, [products, priceRange, color, category, navigate]);

	useEffect(() => {
		handleFilterChange();
	}, [priceRange, color, category, handleFilterChange]);

	return (
		<div className="search-page flex flex-row flex-start gap-4 p-4 h-full w-full text-base">
			<div id="search-controls" className="flex flex-col gap-4">
				<div className="price-range">
					<h3>Price Range</h3>
					<div className="flex flex-row items-center gap-2">
						<label htmlFor="min-price" className="sr-only">
							Min Price
						</label>
						<Input
							id="min-price"
							type="number"
							value={priceRange[0]}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setPriceRange([Number(e.target.value), priceRange[1]])
							}
							placeholder="Min Price"
							min={0}
							className="w-20"
						/>
						to
						<label htmlFor="max-price" className="sr-only">
							Max Price
						</label>
						<Input
							id="max-price"
							type="number"
							value={priceRange[1]}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setPriceRange([priceRange[0], Number(e.target.value)])
							}
							placeholder="Max Price"
							min={0}
							className="w-20"
						/>
					</div>
				</div>
				<div className="color-filter">
					<h3>Color</h3>
					<label htmlFor="color" className="sr-only">
						Color
					</label>
					<Input
						id="color"
						type="text"
						value={color}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setColor(e.target.value)
						}
						placeholder="Color"
					/>
				</div>
				<div className="category-filter">
					<h3>Category</h3>
					<label htmlFor="category" className="sr-only">
						Category
					</label>
					<Select value={category} onValueChange={(value) => setCategory(value)}>
						<SelectTrigger id="category" className="w-full">
							<SelectValue placeholder="Filter by category" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all" className="dark:bg-carribean-current">
								All
							</SelectItem>
							<SelectItem value="earring" className="dark:bg-carribean-current">
								Earring
							</SelectItem>
							<SelectItem value="necklace" className="dark:bg-carribean-current">
								Necklace
							</SelectItem>
							<SelectItem value="bracelet" className="dark:bg-carribean-current">
								Bracelet
							</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div
				id="product-grid"
				className="flex flex-row flex-wrap gap-4 justify-start items-start"
				role="region"
				aria-label="Product results"
			>
				{filteredProducts.map((product) => (
					<ProductCard key={product.id} product={product} onImageClick={() => {}} />
				))}
			</div>
		</div>
	);
};

export default SearchPage;
