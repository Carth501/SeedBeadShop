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
			bg-gradient-to-tr from-carribean-current to-moonstone
			hover:from-moonstone hover:to-gunmetal
			transition duration-250 m-1 text-white
			rounded-2xl shadow-md text-shadow-lg 
			hover:scale-110 hover:border-gunmetal
			hover:shadow-moonstone hover:shadow-lg
			active:shadow-carribean-current active:shadow-xl
			active:from-sky-blue active:to-gunmetal
			hover:border-none"
				onClick={() => handleCategorySelect('earring')}
			>
				Earrings
			</button>
			<button
				className="border border-transparent 
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
				onClick={() => handleCategorySelect('necklace')}
			>
				Necklaces
			</button>
			<button
				className="border border-transparent 
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
				onClick={() => handleCategorySelect('bracelet')}
			>
				Bracelets
			</button>
		</div>
	);
};

export default CategoriesBar;
