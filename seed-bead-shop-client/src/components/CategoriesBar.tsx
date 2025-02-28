import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoriesBar: React.FC = () => {
	const navigate = useNavigate();

	const handleCategorySelect = (category: string) => {
		navigate(`/search?category=${category}`);
	};

	return (
		<div className="categories-bar flex justify-center gap-4 p-4">
			<button
				className="bg-blue-500 text-white py-2 px-4 rounded"
				onClick={() => handleCategorySelect('earrings')}
			>
				Earrings
			</button>
			<button
				className="bg-blue-500 text-white py-2 px-4 rounded"
				onClick={() => handleCategorySelect('necklaces')}
			>
				Necklaces
			</button>
			<button
				className="bg-blue-500 text-white py-2 px-4 rounded"
				onClick={() => handleCategorySelect('bracelets')}
			>
				Bracelets
			</button>
		</div>
	);
};

export default CategoriesBar;
