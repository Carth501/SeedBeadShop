import React, { useState } from 'react';

interface ImageModalProps {
	images: string[];
	isOpen: boolean;
	onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ images, isOpen, onClose }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	if (!isOpen) return null;

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
	};

	const handlePrevious = () => {
		setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
	};

	const handleClose = () => {
		onClose();
		setCurrentIndex(0);
	};

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
				<img
					src={images[currentIndex]}
					alt="Product"
					className="w-auto h-auto max-w-[95vw] max-h-[95vh] rounded-lg"
				/>

				{images.length > 1 && (
					<>
						<button
							onClick={handlePrevious}
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
							onClick={handleNext}
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
		</div>
	);
};

export default ImageModal;
