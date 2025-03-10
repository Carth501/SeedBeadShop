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
			bg-gradient-to-tr from-carribean-current to-moonstone
			hover:from-moonstone hover:to-gunmetal
			transition duration-250 m-1 text-white
			rounded-2xl shadow-md text-shadow-lg 
			hover:scale-110 hover:border-gunmetal
			hover:shadow-moonstone hover:shadow-lg
			active:shadow-carribean-current active:shadow-xl
			active:from-sky-blue active:to-gunmetal
			hover:border-none"
			onClick={onClick}
		>
			{label}
		</button>
	);
};

export default ProductButton;
