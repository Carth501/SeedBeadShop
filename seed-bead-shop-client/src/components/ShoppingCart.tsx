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
	onClose: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ items, onRemove, isOpen, onClose }) => {
	return (
		<div
			className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 ${
				isOpen ? 'translate-x-0' : 'translate-x-full'
			}`}
			style={{ width: '300px' }}
		>
			<div className="p-4">
				<h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
				<button className="absolute top-4 right-4 text-red-500" onClick={onClose}>
					Close
				</button>
				{items.length === 0 ? (
					<p>Your cart is empty.</p>
				) : (
					<ul>
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
			</div>
		</div>
	);
};

export default ShoppingCart;
