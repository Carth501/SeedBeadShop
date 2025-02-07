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
			bg-gradient-to-tr from-rose-300 to-rose-200
			hover:from-rose-200 hover:to-rose-400
			transition duration-250 m-1 text-white
			rounded-2xl shadow-md text-shadow-lg 
			hover:scale-110 hover:border-rose-500
			hover:shadow-rose-200 hover:shadow-lg
			active:shadow-rose-300 active:shadow-xl
			active:from-rose-100 active:to-rose-500"
			onClick={onClick}
		>
			{label}
		</button>
	);
};

export default ProductButton;
