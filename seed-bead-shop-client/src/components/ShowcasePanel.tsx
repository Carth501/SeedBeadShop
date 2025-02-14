import React from 'react';

interface ShowcasePanelProps {
	imageUrl: string;
	opacity: number;
}

const ShowcasePanel: React.FC<ShowcasePanelProps> = ({ imageUrl, opacity }) => {
	return (
		<div
			className="absolute inset-0 flex justify-center items-center transition-opacity duration-1000"
			style={{ opacity }}
		>
			<img src={imageUrl} alt="Panel" className="w-full h-full object-cover" />
			<button className="absolute bottom-10 bg-white text-black px-4 py-2 rounded">
				Shop
			</button>
		</div>
	);
};

export default ShowcasePanel;
