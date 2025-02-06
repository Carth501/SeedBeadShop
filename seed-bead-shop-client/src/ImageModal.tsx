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

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<img src={images[currentIndex]} alt="Product" className="modal-image" />
				<button onClick={handlePrevious} className="modal-button">
					Previous
				</button>
				<button onClick={handleNext} className="modal-button">
					Next
				</button>
			</div>
		</div>
	);
};

export default ImageModal;
