import React, { useEffect, useState } from 'react';
import { fetchImage, fetchShowcase } from '../services/apiService';
import ShowcasePanel from './ShowcasePanel';

const ImagePanelCycle: React.FC = () => {
	const [panels, setPanels] = useState<string[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		console.log('Fetching showcase data...');
		const fetchData = async () => {
			const panelData = await fetchShowcase();
			const imageUrls = await Promise.all(
				panelData.map((panel: { image: string }) => fetchImage(panel.image)),
			);
			setPanels(() => imageUrls);
		};

		fetchData();
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % panels.length);
		}, 4000);

		return () => clearInterval(interval);
	}, [panels]);

	if (panels.length === 0) {
		return <div>Loading...</div>;
	}

	return <div>{panels.length > 0 && <ShowcasePanel imageUrl={panels[currentIndex]} />}</div>;
};

export default ImagePanelCycle;
