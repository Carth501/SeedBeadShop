import React from 'react';

interface HeaderProps {
	shoppingCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ shoppingCartClick }) => {
	const handleCartClick = () => {
		shoppingCartClick();
	};

	return (
		<header
			className="align-middle border-b-solid border-b-2 
		border-b-gray-300 w-[100vw] fixed top-0 left-0 z-1000"
		>
			<div className="background flex justify-between p-4">
				<div
					className="text-2xl font-bold h-[2em] p-[1.25em] 
				align-middle hover:drop-shadow-[0_0_2em_#646cffaa] flex
				items-center justify-center"
				>
					Logo
				</div>
				<div className="flex gap-6 items-center">
					<button
						className="w-12 h-12 flex items-center justify-center bg-gradient-to-tr from-rose-400 
						to-rose-300 hover:from-rose-300 hover:to-rose-500 transition duration-250 m-1 
						text-white rounded-2xl shadow-md text-shadow-lg hover:scale-110 hover:border-rose-600
						active:from-rose-200 active:to-rose-600"
						onClick={handleCartClick}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
							/>
						</svg>
					</button>
					<div className="text-base">
						info@example.com
						<br />
						+1 234 555 8902
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
