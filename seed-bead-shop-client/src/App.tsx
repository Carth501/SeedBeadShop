import './App.css';
import Header from './Header';
import ProductCard from './ProductCard';
import earrings_1 from './assets/earrings_1.png';
import earrings_2 from './assets/earrings_2.png';
import earrings_3 from './assets/earrings_3.png';
import Blossoms from './blossoms/blossoms';

function App() {
	const products = [
		{
			image: earrings_1,
			price: '$10.00',
			label: 'Product 1',
			description: 'Description of product 1',
			inStock: false,
		},
		{
			image: earrings_2,
			price: '$20.00',
			label: 'Product 2',
			description: 'Description of product 2',
			inStock: false,
		},

		{
			image: earrings_3,
			price: '$30.00',
			label: 'Product 3',
			description: 'Description of product 3',
			inStock: false,
		},
	];

	return (
		<>
			<Header />
			<div className="product-row flex overflow-x-auto overflow-y-visible p-4 gap-4 w-screen">
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
			<div className="absolute top-0 left-0 w-full h-screen -z-1">
				<Blossoms />
			</div>
		</>
	);
}

export default App;
