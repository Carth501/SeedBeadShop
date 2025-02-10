import React, { useEffect, useState } from 'react';
import { fetchImage } from './services/apiService';

interface ImageGalleryProps {
	images: string[];
	interval?: number;
	fade_duration?: number;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
	images,
	interval = 6000,
	fade_duration = 600,
}) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [opacity, setOpacity] = useState(0);
	const [imageSrcs, setImageSrcs] = useState<string[]>([]);

	useEffect(() => {
		console.log('rendering');

		const cycleImages = setInterval(() => {
			setOpacity(() => 0);
			setTimeout(() => {
				setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
				setOpacity(() => 1);
			}, fade_duration);
		}, interval);

		return () => {
			clearInterval(cycleImages);
		};
	}, [images.length, interval, fade_duration]);

	useEffect(() => {
		const loadImages = async () => {
			if (images.length > 0) {
				try {
					const imageUrls = await Promise.all(images.map((image) => fetchImage(image)));
					setImageSrcs(imageUrls);
				} catch (error) {
					console.error('Error fetching images:', error);
				}
			}
		};

		loadImages();
	}, [images]);

	return (
		<div className="image-gallery fixed top-22 left-0 w-full h-full -z-10">
			{imageSrcs.length > 0 && (
				<img
					src={imageSrcs[currentIndex]}
					alt="Gallery"
					className="image-gallery-display w-full h-60 object-cover rounded
					overflow-hidden transition-opacity duration-500 ease-in-out"
					style={{ opacity }}
				/>
			)}
			<div className="flex justify-center mt-4">
				{images.map((_, index) => (
					<span
						key={index}
						className={`h-3 w-3 mx-2 bg-gray-400/70 rounded-full inline-block 
							transition ease-in-out duration-${fade_duration} ${index === currentIndex ? 'bg-pink-300' : ''}`}
					></span>
				))}
			</div>
		</div>
	);
};

export default ImageGallery;
