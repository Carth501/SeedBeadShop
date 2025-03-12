import React from 'react';
import { CartItem } from '../types';
import PrimaryButton from './PrimaryButton';

interface ShoppingCartProps {
	items: CartItem[];
	onRemove: (id: number) => void;
	isOpen: boolean;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ items, onRemove, isOpen }) => {
	const totalPrice = items
		.reduce((total, item) => {
			return total + item.product.price * item.quantity;
		}, 0)
		.toFixed(2);

	function handleCheckout() {
		console.log('checkout');
	}

	return (
		<div
			className={`fixed top-0 right-0 h-full bg-cyan-100 dark:bg-carribean-current 
				shadow-lg transition-transform duration-300 text-base ${
					isOpen ? 'translate-x-0' : 'translate-x-full'
				}`}
			style={{ width: '300px' }}
			role="dialog"
			aria-labelledby="shopping-cart-title"
			aria-modal="true"
		>
			<div className="p-4 pt-30 flex flex-col h-full">
				<h2 id="shopping-cart-title" className="sr-only">
					Shopping Cart
				</h2>
				{items.length === 0 ? (
					<p>Your cart is empty.</p>
				) : (
					<ul className="flex-grow overflow-y-auto" aria-live="polite">
						{items.map((item) => (
							<li
								key={item.product.id}
								className="flex justify-between items-center mb-2"
							>
								<div>
									<span className="font-bold">{item.product.label}</span> -{' '}
									{item.product.price} x {item.quantity}
								</div>
								<button
									className="text-carribean-current hover:text-moonstone 
									dark:text-moonstone dark:hover:text-uranian-blue"
									onClick={() => onRemove(item.product.id)}
									aria-label={`Remove ${item.product.label} from cart`}
								>
									Remove
								</button>
							</li>
						))}
					</ul>
				)}
				{items.length > 0 && (
					<div className="mt-4">
						<div className="flex justify-between items-center mb-4">
							<span className="font-bold">Total:</span>
							<span className="font-bold">${totalPrice}</span>
						</div>
						<PrimaryButton
							onClick={() => handleCheckout()}
							aria-label="Proceed to checkout"
						>
							Checkout
						</PrimaryButton>
					</div>
				)}
			</div>
		</div>
	);
};

export default ShoppingCart;
