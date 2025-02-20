import React, { useEffect, useState } from 'react';
import { fetchImage } from './services/apiService';

interface ImageModalProps {
	images: string[];
	isOpen: boolean;
	onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ images, isOpen, onClose }) => {
	const [imageSrcs, setImageSrcs] = useState<string[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const loadImages = async () => {
			if (isOpen && images.length > 0) {
				try {
					const imageUrls = await Promise.all(images.map((image) => fetchImage(image)));
					setImageSrcs(imageUrls);
				} catch (error) {
					console.error('Error fetching images:', error);
				}
			}
		};

		loadImages();
	}, [isOpen, images]);

	const handleClose = () => {
		onClose();
		setImageSrcs([]);
		setCurrentIndex(0);
	};

	if (!isOpen) return null;

	return (
		<div
			className="fixed top-0 left-0 w-full h-full bg-black/70
			 flex justify-center items-center z-1000"
			onClick={handleClose}
		>
			<div
				className="bg-pink-100 rounded-lg p-5 shadow-lg max-w-full
				max-h-full overflow-auto"
				onClick={(e) => e.stopPropagation()}
			>
				{imageSrcs.length > 0 ? (
					<img
						src={imageSrcs[currentIndex]}
						alt="Product"
						className="w-auto h-auto max-w-[95vw] max-h-[95vh] rounded-lg"
					/>
				) : (
					<div className="loader">Loading...</div>
				)}

				{imageSrcs.length > 1 && (
					<>
						<button
							onClick={() =>
								setCurrentIndex(
									(prevIndex) =>
										(prevIndex - 1 + imageSrcs.length) % imageSrcs.length,
								)
							}
							className="origin-center absolute top-1/2 bg-gray-300/70 
							border-none p-2 cursor-pointer rounded-full shadow-sm left-3"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="size-6"
							>
								<path
									fillRule="evenodd"
									d="M7.72 11.47a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 0 1-1.06 1.06l-7.5-7.5Z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
						<button
							onClick={() =>
								setCurrentIndex((prevIndex) => (prevIndex + 1) % imageSrcs.length)
							}
							className="origin-center absolute top-1/2 bg-gray-300/70 
							border-none p-2 cursor-pointer rounded-full shadow-sm right-3"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="size-6"
							>
								<path
									fillRule="evenodd"
									d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					</>
				)}
				<button
					className="origin-center absolute top-2 right-2 bg-gray-300/70 
					border-none p-2 cursor-pointer rounded-full shadow-sm w-10 h-10
					flex justify-center items-center"
					onClick={onClose}
					aria-label="Close modal"
				>
					X
				</button>
				<div className="flex justify-center mt-4">
					{imageSrcs.map((_, index) => (
						<span
							key={index}
							className={`h-3 w-3 mx-2 bg-gray-400/70 rounded-full inline-block transition ease-in-out duration-300 ${
								index === currentIndex ? 'bg-pink-300' : ''
							}`}
							onClick={() => setCurrentIndex(index)}
						></span>
					))}
				</div>
			</div>
		</div>
	);
};

export default ImageModal;
