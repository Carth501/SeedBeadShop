import React from 'react';

interface CartItem {
	id: number;
	label: string;
	price: string;
	quantity: number;
}

interface ShoppingCartProps {
	items: CartItem[];
	onRemove: (id: number) => void;
	isOpen: boolean;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ items, onRemove, isOpen }) => {
	console.log('Cart items:', items);

	const totalPrice = items
		.reduce((total, item) => {
			const price = parseFloat(item.price);
			if (isNaN(price)) {
				console.error(`Invalid price for item ${item.id}: ${item.price}`);
				return total;
			}
			return total + price * item.quantity;
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
							<li key={item.id} className="flex justify-between items-center mb-2">
								<div>
									<span className="font-bold">{item.label}</span> - {item.price} x{' '}
									{item.quantity}
								</div>
								<button className="text-red-500" onClick={() => onRemove(item.id)}>
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
