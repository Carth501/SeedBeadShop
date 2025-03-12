import React from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from './PrimaryButton';

const CategoriesBar: React.FC = () => {
	const navigate = useNavigate();

	const handleCategorySelect = (category: string) => {
		navigate(`/search?category=${category}`);
	};

	return (
		<div className="categories-bar flex justify-center gap-4 p-4">
			<PrimaryButton
				onClick={() => handleCategorySelect('earring')}
				aria-label="Select Earrings Category"
			>
				Earrings
			</PrimaryButton>
			<PrimaryButton
				onClick={() => handleCategorySelect('necklace')}
				aria-label="Select Necklaces Category"
			>
				Necklaces
			</PrimaryButton>
			<PrimaryButton
				onClick={() => handleCategorySelect('bracelet')}
				aria-label="Select Bracelets Category"
			>
				Bracelets
			</PrimaryButton>
		</div>
	);
};

export default CategoriesBar;
