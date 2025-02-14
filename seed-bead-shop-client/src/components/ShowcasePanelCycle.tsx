import React, { useEffect, useState } from 'react';
import { fetchImage, fetchShowcase } from '../services/apiService';
import ShowcasePanel from './ShowcasePanel';

const ImagePanelCycle: React.FC = () => {
	const [panels, setPanels] = useState<string[]>([]);
	const [opacities, setOpacities] = useState<number[]>([]);

	useEffect(() => {
		console.log('Fetching showcase data...');
		const fetchData = async () => {
			const panelData = await fetchShowcase();
			const imageUrls = await Promise.all(
				panelData.map((panel: { image: string }) => fetchImage(panel.image)),
			);
			setPanels(() => imageUrls);
			setOpacities(() => {
				const newOpacities = Array(panelData.length).fill(0);
				newOpacities[0] = 1;
				return newOpacities;
			});
		};

		fetchData();
	}, []);

	useEffect(() => {
		console.log('Starting panel cycle...');
		const interval = setInterval(() => {
			setOpacities((prevOpacities) => {
				const newOpacities = [...prevOpacities];
				const lastOpacity = newOpacities.pop();
				if (lastOpacity !== undefined) {
					newOpacities.unshift(lastOpacity);
				}
				return newOpacities;
			});
		}, 8000);

		return () => clearInterval(interval);
	}, [panels]);

	if (panels.length === 0) {
		return <div>Loading...</div>;
	}

	return (
		<div className="relative w-full h-80 bg-black">
			{panels.map((panel, index) => (
				<ShowcasePanel key={index} imageUrl={panel} opacity={opacities[index]} />
			))}
		</div>
	);
};

export default ImagePanelCycle;
