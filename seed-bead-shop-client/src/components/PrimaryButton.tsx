import React from 'react';
import { Button } from './ui/button';

interface PrimaryButtonProps {
	onClick: () => void;
	children: React.ReactNode;
	className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ onClick, children, className }) => {
	return (
		<Button
			onClick={onClick}
			className={`px-4 py-2 border border-transparent primary-button text-base font-bold 
                    cursor-pointer bg-gradient-to-tr rounded-2xl shadow-md text-shadow-lg hover:scale-110 
                    hover:shadow-lg transition duration-250 m-1
					text-white
					from-carribean-current to-moonstone
                    hover:from-moonstone hover:to-gunmetal
                    active:from-sky-blue active:to-gunmetal 
					active:shadow-carribean-current active:shadow-xl
					${className}`}
		>
			{children}
		</Button>
	);
};

export default PrimaryButton;
