import './App.css';
import Header from './Header';
import ProductCard from './ProductCard';

function App() {
	const products = [
		{
			image: '/path/to/image1.jpg',
			price: '$10.00',
			label: 'Product 1',
			description: 'Description of product 1',
			inStock: true,
		},
		{
			image: '/path/to/image2.jpg',
			price: '$20.00',
			label: 'Product 2',
			description: 'Description of product 2',
			inStock: false,
		},
		{
			image: '/path/to/image3.jpg',
			price: '$30.00',
			label: 'Product 3',
			description: 'Description of product 3',
			inStock: true,
		},
	];

	return (
		<>
			<Header />
			<div className="product-row flex overflow-x-auto p-4 gap-4">
				{products.map((product, index) => (
					<ProductCard
						key={index}
						image={product.image}
						price={product.price}
						label={product.label}
						description={product.description}
						inStock={product.inStock}
					/>
				))}
			</div>
		</>
	);
}

export default App;
