import React from 'react';
import PrimaryButton from './components/PrimaryButton';

interface ProductButtonProps {
	label: string;
	onClick: () => void;
	ariaLabel?: string;
}

const ProductButton: React.FC<ProductButtonProps> = ({ label, onClick, ariaLabel }) => {
	return (
		<PrimaryButton onClick={onClick} aria-label={ariaLabel || label}>
			{label}
		</PrimaryButton>
	);
};

export default ProductButton;
