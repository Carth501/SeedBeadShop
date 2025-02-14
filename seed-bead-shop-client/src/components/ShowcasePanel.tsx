import React from 'react';

interface ShowcasePanelProps {
	imageUrl: string;
}

const ShowcasePanel: React.FC<ShowcasePanelProps> = ({ imageUrl }) => {
	return (
		<div className="image-panel">
			<img src={imageUrl} alt="Panel" className="w-full h-auto" />
		</div>
	);
};

export default ShowcasePanel;
