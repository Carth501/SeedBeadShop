import React from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from './PrimaryButton';

interface ShowcasePanelProps {
	imageUrl: string;
	opacity: number;
	text?: string;
	id?: string;
}

const ShowcasePanel: React.FC<ShowcasePanelProps> = ({ imageUrl, opacity, text, id }) => {
	const navigate = useNavigate();

	function handleClick() {
		navigate(`/product/${id}`);
	}

	return (
		<div
			className="absolute inset-0 flex justify-center items-center transition-opacity duration-1000 overflow-hidden"
			style={{ opacity }}
		>
			<img src={imageUrl} alt="Panel" className="object-cover" />
			{text && (
				<div className="absolute inset-0 flex justify-center items-center">
					<div className="bg-black/60 p-3 rounded">
						<span className="text-white text-2xl font-bold">{text}</span>
					</div>
				</div>
			)}
			{id && (
				<PrimaryButton className="absolute bottom-10 product-button" onClick={handleClick}>
					Shop
				</PrimaryButton>
			)}
		</div>
	);
};

export default ShowcasePanel;
