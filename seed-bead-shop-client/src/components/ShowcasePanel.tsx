import React from 'react';

interface ShowcasePanelProps {
	imageUrl: string;
	opacity: number;
	text?: string;
}

const ShowcasePanel: React.FC<ShowcasePanelProps> = ({ imageUrl, opacity, text }) => {
	return (
		<div
			className="absolute inset-0 flex justify-center items-center transition-opacity duration-1000 overflow-x-hidden"
			style={{ opacity }}
		>
			<img src={imageUrl} alt="Panel" className="object-cover" />
			{text && (
				<div
					className="absolute inset-0 flex justify-center items-center text-white text-2xl font-bold"
					style={{
						textShadow:
							'2px 2px 4px rgba(0, 0, 0, 0.9), -2px -2px 4px rgba(0, 0, 0, 0.9), 2px -2px 4px rgba(0, 0, 0, 0.9), -2px 2px 4px rgba(0, 0, 0, 0.9)',
					}}
				>
					{text}
				</div>
			)}
			<button
				className="absolute bottom-10 
                product-button border border-transparent 
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
				style={{ bottom: '40px' }}
			>
				Shop
			</button>
		</div>
	);
};

export default ShowcasePanel;
