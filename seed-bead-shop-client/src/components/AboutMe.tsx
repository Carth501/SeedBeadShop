import React from 'react';

const AboutMe: React.FC = () => {
	return (
		<div className="about-me p-16 mt-8 border-t border-gray-300 bg-carribean-current text-white font-semibold flex items-center justify-center">
			<div className="w-2/3">
				<h2 className="text-lg">About Me</h2>
				<p className="">
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
