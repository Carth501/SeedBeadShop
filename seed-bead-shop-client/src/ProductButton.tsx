import React from 'react';
import PrimaryButton from './components/PrimaryButton';

interface ProductButtonProps {
	label: string;
	onClick: () => void;
}

const ProductButton: React.FC<ProductButtonProps> = ({ label, onClick }) => {
	return <PrimaryButton onClick={onClick}>{label}</PrimaryButton>;
};

export default ProductButton;
