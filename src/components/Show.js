import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../Utils/API';
import ShowHotelCard from '../common/ShowHotelCard';
import HomeArrow from './HomeArrow';

const ShowHotels = (props) => {
	const [hotel, setHotel] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [sortTerm, setSortTerm] = useState('');

	// useEffect to retireve each hotel based on their ID//
	useEffect(() => {
		const getHotel = async () => {
			try {
				let res = await axiosInstance.get(
					`?hotel-codes=${props.match.params.id}`
				);
				setHotel(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getHotel();
	}, [props.match.params.id]);

	// This handleFilterChange change is passed into ShowHotelCard as props//
	const handleFilterChange = (searchTerm) => {
		setSortTerm(searchTerm);
	};

	console.log('get a hotel', hotel);
	if (hotel.length === 0) return <h4>Loading...</h4>;
	return (
		<>
			<div className='container'>
				<div className='row mt-4'>
					<HomeArrow />
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
