import React from 'react';
import { Button } from './ui/button';

interface PrimaryButtonProps {
	onClick: () => void;
	children: React.ReactNode;
	className?: string;
	ariaLabel?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
	onClick,
	children,
	className,
	ariaLabel,
}) => {
	return (
		<Button
			onClick={onClick}
			className={`px-4 py-2 border-4 border-transparent primary-button text-base font-bold 
                    cursor-pointer bg-gradient-to-tr rounded-2xl shadow-md text-shadow-lg 
					hover:scale-115 hover:shadow-lg transition duration-250 m-1
					text-white
					from-carribean-current to-moonstone
                    hover:from-moonstone hover:to-gunmetal
                    active:from-sky-blue active:to-gunmetal 
					active:shadow-carribean-current active:shadow-xl
					focus:border-blue-600 dark:focus:border-blue-400
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600
					${className}`}
			aria-label={ariaLabel}
		>
			{children}
		</Button>
	);
};

export default PrimaryButton;
