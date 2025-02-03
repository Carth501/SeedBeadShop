import React from 'react';

interface ProductButtonProps {
	label: string;
	onClick: () => void;
}

const ProductButton: React.FC<ProductButtonProps> = ({ label, onClick }) => {
	return (
		<button
			className="rounded-lg border border-transparent px-4 py-2 text-base font-medium bg-blue-200 transition-colors duration-250 hover:border-blue-500"
			onClick={onClick}
		>
			{label}
		</button>
	);
};

export default ProductButton;
