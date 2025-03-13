// filepath: c:\Users\carth\React Projects\SeedBeadShop\seed-bead-shop-client\src\components\Checkout.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types';

interface CheckoutProps {
	items: CartItem[];
}

const Checkout: React.FC<CheckoutProps> = ({ items }) => {
	const navigate = useNavigate();

	const totalPrice = items
		.reduce((total, item) => total + item.product.price * item.quantity, 0)
		.toFixed(2);

	const handlePlaceOrder = () => {
		console.log('Order placed');
		navigate('/order-confirmation');
	};

	return (
		<div className="checkout-container">
			<h1>Checkout</h1>
			<ul>
				{items.map((item) => (
					<li key={item.product.id}>
						{item.product.label} - {item.product.price} x {item.quantity}
					</li>
				))}
			</ul>
			<div>Total: ${totalPrice}</div>
			<button onClick={handlePlaceOrder}>Place Order</button>
		</div>
	);
};

export default Checkout;
