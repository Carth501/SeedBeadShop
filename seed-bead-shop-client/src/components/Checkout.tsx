// filepath: c:\Users\carth\React Projects\SeedBeadShop\seed-bead-shop-client\src\components\Checkout.tsx
import React from 'react';
import { CartItem } from '../types';
import PrimaryButton from './PrimaryButton';

interface CheckoutProps {
	items: CartItem[];
}

const Checkout: React.FC<CheckoutProps> = ({ items }) => {
	const totalPrice = items
		.reduce((total, item) => total + item.product.price * item.quantity, 0)
		.toFixed(2);

	const handlePlaceOrder = () => {
		console.log('Order placed');
	};

	return (
		<div className="checkout-container">
			<h1>Preview Order</h1>
			<ul>
				{items.map((item) => (
					<li key={item.product.id}>
						{item.product.label} - {item.product.price} x {item.quantity}
					</li>
				))}
			</ul>
			<div>Total: ${totalPrice}</div>
			<PrimaryButton onClick={handlePlaceOrder}>Place Order</PrimaryButton>
		</div>
	);
};

export default Checkout;
