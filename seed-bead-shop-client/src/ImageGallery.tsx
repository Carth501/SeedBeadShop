import React, { useEffect, useState } from 'react';

interface ImageGalleryProps {
	images: string[];
	interval?: number; // Interval in milliseconds
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, interval = 3000 }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const cycleImages = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
		}, interval);

		return () => clearInterval(cycleImages);
	}, [images.length, interval]);

	return (
		<div className="image-gallery fixed top-22 left-0 w-full h-full -z-10">
			<img
				src={images[currentIndex]}
				alt="Gallery"
				className="image-gallery-display w-full h-60 object-cover rounded overflow-hidden"
			/>
			<div className="flex justify-center mt-4">
				{images.map((_, index) => (
					<span
						key={index}
						className={`h-3 w-3 mx-2 bg-gray-400/70 rounded-full inline-block transition ease-in-out duration-300 ${
							index === currentIndex ? 'bg-pink-300' : ''
						}`}
					></span>
				))}
			</div>
		</div>
	);
};

export default ImageGallery;
