import React from 'react';

const Header: React.FC = () => {
	return (
		<header
			className="align-middle border-b-solid border-b-2 
		border-b-gray-300 w-[100vw] fixed top-0 left-0 z-1000"
		>
			<div className="background flex justify-between p-4">
				<div className="text-2xl font-bold">Logo</div>
				<div className="text-base">
					info@example.com
					<br />
					+1 234 555 8902
				</div>
			</div>
		</header>
	);
};

export default Header;
