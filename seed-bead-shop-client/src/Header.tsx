import React from 'react';
import './Header.css';

const Header: React.FC = () => {
	return (
		<header className="header">
			<div className="header-content background">
				<div className="logo-placeholder">Logo</div>
				<div className="contact-info">
					info@example.com
					<br />
					+1 234 555 8902
				</div>
			</div>
		</header>
	);
};

export default Header;
