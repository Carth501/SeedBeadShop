import React, { useEffect, useRef, useState } from 'react';
import { fetchImage } from './services/apiService';

interface ImageModalProps {
	images: string[];
	isOpen: boolean;
	onClose: () => void;
	index?: number;
}

const ImageModal: React.FC<ImageModalProps> = ({ images, isOpen, onClose, index }) => {
	const [imageSrcs, setImageSrcs] = useState<string[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const modalRef = useRef<HTMLDivElement>(null);

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

		modalRef.current?.focus();
		loadImages();
	}, [isOpen, images]);

	useEffect(() => {
		if (isOpen && index) {
			setCurrentIndex(index);
		}
	}, [isOpen, index]);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Escape') {
			onClose();
		} else if (e.key === 'ArrowLeft') {
			setCurrentIndex((prevIndex) => (prevIndex - 1 + imageSrcs.length) % imageSrcs.length);
		} else if (e.key === 'ArrowRight') {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % imageSrcs.length);
		}
	};

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
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
			aria-describedby="modal-description"
			tabIndex={-1}
			ref={modalRef}
			onKeyDown={handleKeyDown}
		>
			<div
				className="bg-uranian-blue dark:bg-gunmetal rounded-lg p-5 shadow-lg max-w-full
				max-h-full overflow-auto"
				onClick={(e) => e.stopPropagation()}
			>
				{imageSrcs.length > 0 ? (
					<img
						src={imageSrcs[currentIndex]}
						alt={`Product image ${currentIndex + 1}`}
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
							className="origin-center absolute top-1/2 bg-sky-blue dark:bg-carribean-current
							border-none p-2 cursor-pointer rounded-full shadow-sm left-3"
							aria-label="Previous image"
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
							className="origin-center absolute top-1/2 bg-sky-blue dark:bg-carribean-current
							border-none p-2 cursor-pointer rounded-full shadow-sm right-3"
							aria-label="Next image"
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
					className="origin-center absolute top-2 right-2 bg-sky-blue dark:bg-carribean-current
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
							className={`h-3 w-3 mx-2 rounded-full inline-block transition ease-in-out duration-300 ${
								index === currentIndex
									? 'bg-sky-blue'
									: 'bg-gunmetal dark:bg-carribean-current'
							}`}
							onClick={() => setCurrentIndex(index)}
							aria-label={`View image ${index + 1}`}
							tabIndex={0}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									setCurrentIndex(index);
								}
							}}
						></span>
					))}
				</div>
			</div>
		</div>
	);
};

export default ImageModal;
