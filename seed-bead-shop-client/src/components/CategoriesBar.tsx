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
				className="border border-transparent 
			px-4 py-2 text-base font-bold cursor-pointer
			bg-gradient-to-tr from-rose-400 to-rose-300
			hover:from-rose-300 hover:to-rose-500
			transition duration-250 m-1 text-white
			rounded-2xl shadow-md text-shadow-lg 
			hover:scale-110 hover:border-rose-600
			hover:shadow-rose-300 hover:shadow-lg
			active:shadow-rose-400 active:shadow-xl
			active:from-rose-200 active:to-rose-600
			hover:border-none"
				onClick={() => handleCategorySelect('earring')}
			>
				Earrings
			</button>
			<button
				className="border border-transparent 
			px-4 py-2 text-base font-bold cursor-pointer
			bg-gradient-to-tr from-rose-400 to-rose-300
			hover:from-rose-300 hover:to-rose-500
			transition duration-250 m-1 text-white
			rounded-2xl shadow-md text-shadow-lg 
			hover:scale-110 hover:border-rose-600
			hover:shadow-rose-300 hover:shadow-lg
			active:shadow-rose-400 active:shadow-xl
			active:from-rose-200 active:to-rose-600
			hover:border-none"
				onClick={() => handleCategorySelect('necklace')}
			>
				Necklaces
			</button>
			<button
				className="border border-transparent 
			px-4 py-2 text-base font-bold cursor-pointer
			bg-gradient-to-tr from-rose-400 to-rose-300
			hover:from-rose-300 hover:to-rose-500
			transition duration-250 m-1 text-white
			rounded-2xl shadow-md text-shadow-lg 
			hover:scale-110 hover:border-rose-600
			hover:shadow-rose-300 hover:shadow-lg
			active:shadow-rose-400 active:shadow-xl
			active:from-rose-200 active:to-rose-600
			hover:border-none"
				onClick={() => handleCategorySelect('bracelet')}
			>
				Bracelets
			</button>
		</div>
	);
};

export default CategoriesBar;
