import React from 'react';

interface ProductButtonProps {
	label: string;
	onClick: () => void;
}

const ProductButton: React.FC<ProductButtonProps> = ({ label, onClick }) => {
	return (
		<button
			className="rounded-lg border border-transparent px-4 py-2 text-base font-medium bg-gray-800 transition-colors duration-250 hover:border-gray-500"
			onClick={onClick}
		>
			{label}
		</button>
	);
};

export default ProductButton;
