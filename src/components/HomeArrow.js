import React from 'react';
import { Link } from 'react-router-dom';

const HomeArrow = () => {
	return (
		<>
			<Link to={'/hotels'} className='text-decoration-none'>
				<p>← Back to Home</p>
			</Link>
		</>
	);
};

export default HomeArrow;
