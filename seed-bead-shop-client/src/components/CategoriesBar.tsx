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
			<PrimaryButton onClick={() => handleCategorySelect('earring')}>Earrings</PrimaryButton>
			<PrimaryButton onClick={() => handleCategorySelect('necklace')}>
				Necklaces
			</PrimaryButton>
			<PrimaryButton onClick={() => handleCategorySelect('bracelet')}>
				Bracelets
			</PrimaryButton>
		</div>
	);
};

export default CategoriesBar;
