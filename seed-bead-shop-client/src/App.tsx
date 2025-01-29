import './App.css';
import Header from './Header';
import ProductCard from './ProductCard';

function App() {
	return (
		<>
			<Header />
			<div className="product-row flex overflow-x-auto p-4 gap-4">
				<ProductCard
					image="/path/to/image1.jpg"
					price="$10.00"
					label="Product 1"
					description="Description of product 1"
					inStock={true}
				/>
				<ProductCard
					image="/path/to/image2.jpg"
					price="$20.00"
					label="Product 2"
					description="Description of product 2"
					inStock={false}
				/>
				<ProductCard
					image="/path/to/image3.jpg"
					price="$30.00"
					label="Product 3"
					description="Description of product 3"
					inStock={true}
				/>
			</div>
		</>
	);
}

export default App;
