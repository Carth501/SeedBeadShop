import React from 'react';
import { CartItem } from '../types';

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

	return (
		<div
			className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 ${
				isOpen ? 'translate-x-0' : 'translate-x-full'
			}`}
			style={{ width: '300px' }}
		>
			<div className="p-4 pt-25 flex flex-col h-full">
				{items.length === 0 ? (
					<p>Your cart is empty.</p>
				) : (
					<ul className="flex-grow overflow-y-auto">
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
									className="text-red-500"
									onClick={() => onRemove(item.product.id)}
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
						<button className="w-full bg-blue-500 text-white py-2 rounded">
							Checkout
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default ShoppingCart;
