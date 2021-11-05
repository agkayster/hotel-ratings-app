import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShowHotelCard from '../common/ShowHotelCard';

const ShowHotels = (props) => {
	const [hotel, setHotel] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [sortTerm, setSortTerm] = useState('');

	// useEffect to retireve each hotel based on their ID//
	useEffect(() => {
		const getHotel = async () => {
			let res = await axios.get(
				`https://api.whitbread.co.uk/reviews?hotel-codes=${props.match.params.id}`
			);
			setHotel(res.data);
		};
		getHotel();
	}, [props.match.params.id]);

	// This handleFilterChange change is passed into ShowHotelCard as props//
	const handleFilterChange = (searchTerm) => {
		setSortTerm(searchTerm);
	};

	console.log('get a hotel', hotel);
	if (!hotel) return 'Loading...';
	return (
		<>
			<div className='container'>
				<div className='row mt-4'>
					{/* passed item as props to ShowHotelCard component */}
					{hotel.length > 0 &&
						hotel.map((item) => (
							<ShowHotelCard
								key={item.hotelCode}
								item={item}
								onhandleFilterChange={handleFilterChange}
								onSearchTerm={searchTerm}
								onSortTerm={sortTerm}
							/>
						))}
				</div>
			</div>
		</>
	);
};

export default ShowHotels;

// {
// 	hotel.map((item) => (
// 		<div className='col'>
// 			<div
// 				className='card text-dark bg-warning'
// 				style={{ width: '50rem' }}>
// 				<div className='card-header fw-bold'>{item.name}</div>
// 				<div className='card-body'>
// 					<h5>{item.address}</h5>
// 					<p>
// 						<span className='fw-bold'>Hotel Code</span>:{' '}
// 						{item.hotelCode}
// 					</p>
// 					<p>
// 						<span className='fw-bold'>Average Rating</span>:{' '}
// 						{item.rating}
// 					</p>
// 				</div>
// 				<ul className='list-group list-group-flush'>
// 					{item.reviews.map((item) => (
// 						<li className='list-group-item'>
// 							<div className='fw-bold'>Review</div>
// 							<ul className='list-group list-group-flush'>
// 								<li className='list-group-item'>
// 									<span className='fw-bold'>Summary</span>:{' '}
// 									{item.title}
// 								</li>
// 								<li className='list-group-item'>{item.text}</li>
// 								<li className='list-group-item'>
// 									<span className='fw-bold'>Rating</span>:{' '}
// 									{item.rating}
// 								</li>
// 								<li className='card-footer list-group-item'>
// 									<span className='fw-bold'>Date</span>:{' '}
// 									{new Date(item.publishedDate).toUTCString()}
// 								</li>
// 							</ul>
// 						</li>
// 					))}
// 				</ul>
// 			</div>
// 		</div>
// 	));
// }
