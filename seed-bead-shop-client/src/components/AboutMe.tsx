import React from 'react';

const AboutMe: React.FC = () => {
	return (
		<div
			className="about-me text-base p-16 mt-8 
		bg-uranian-blue text-carribean-current 
		dark:border-uranian-blue dark:bg-carribean-current dark:text-uranian-blue
		flex items-center justify-center"
		>
			<div className="w-2/3">
				<h2 className="text-lg">About Me</h2>
				<p>
					Welcome to Seed Bead Shop! I am a passionate jewelry maker with a love for
					creating beautiful and unique pieces. Each item is unique and made as I learn
					new techniques and explore new patterns. If you have questions, please email me
					at _____@seedbeadshop.com. Thank you for visiting my shop!
				</p>
			</div>
		</div>
	);
};

export default AboutMe;
