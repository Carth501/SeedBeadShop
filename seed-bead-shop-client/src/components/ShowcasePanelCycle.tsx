import React, { useEffect, useState } from 'react';
import { fetchImage, fetchShowcase } from '../services/apiService';
import ShowcasePanel from './ShowcasePanel';

interface PanelData {
	image: string;
	description: string;
	label: string;
	imageUrl?: string;
	id?: string;
}

const ImagePanelCycle: React.FC = () => {
	const [panels, setPanels] = useState<PanelData[]>([]);
	const [opacities, setOpacities] = useState<number[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const panelData: PanelData[] = await fetchShowcase();
			const panelDataWithImages = await Promise.all(
				panelData.map(async (panel) => {
					const imageUrl = await fetchImage(panel.image);
					return { ...panel, imageUrl };
				}),
			);
			setPanels(() => panelDataWithImages);
			setOpacities(() => {
				const newOpacities = Array(panelData.length).fill(0);
				newOpacities[0] = 1;
				return newOpacities;
			});
		};

		fetchData();
	}, []);

	useEffect(() => {
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
		<div
			className="relative w-full h-80 bg-uranian-blue dark:bg-carribean-current"
			role="region"
			aria-label="Showcase panel cycle"
		>
			{panels.map((panel, index) => (
				<ShowcasePanel
					key={index}
					imageUrl={panel.imageUrl || ''}
					opacity={opacities[index]}
					text={panel.label}
					id={panel.id}
				/>
			))}
		</div>
	);
};

export default ImagePanelCycle;
