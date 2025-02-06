import React, { useState } from 'react';
import './ImageModal.css';

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
		<div className="modal-overlay" onClick={handleClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<img src={images[currentIndex]} alt="Product" className="modal-image" />
				{images.length > 1 && (
					<>
						<button onClick={handlePrevious} className="modal-button">
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
						<button onClick={handleNext} className="modal-button">
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
				<div className="dots-container">
					{images.map((_, index) => (
						<span
							key={index}
							className={`dot ${index === currentIndex ? 'active' : ''}`}
						></span>
					))}
				</div>
			</div>
		</div>
	);
};

export default ImageModal;
