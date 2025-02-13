import React from 'react';

interface ProductButtonProps {
	label: string;
	onClick: () => void;
}

const ProductButton: React.FC<ProductButtonProps> = ({ label, onClick }) => {
	return (
		<button
			className="product-button border border-transparent 
			px-4 py-2 text-base font-bold cursor-pointer
			bg-gradient-to-tr from-rose-400 to-rose-300
			hover:from-rose-300 hover:to-rose-500
			transition duration-250 m-1 text-white
			rounded-2xl shadow-md text-shadow-lg 
			hover:scale-110 hover:border-rose-600
			hover:shadow-rose-300 hover:shadow-lg
			active:shadow-rose-400 active:shadow-xl
			active:from-rose-200 active:to-rose-600"
			onClick={onClick}
		>
			{label}
		</button>
	);
};

export default ProductButton;
