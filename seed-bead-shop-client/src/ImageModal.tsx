import React from 'react';
import './ImageModal.css';

interface ImageModalProps {
	image: string;
	isOpen: boolean;
	onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<img src={image} alt="Product" className="modal-image" />
			</div>
		</div>
	);
};

export default ImageModal;
