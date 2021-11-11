import React, { useState, useEffect } from 'react';
import HotelCard from '../common/HotelCard';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../Utils/API';

function Client() {
	// Array that holds all the hotel codes options//
	const hotelCodesOptionsData = [
		'All',
		'LONTOW',
		'LONPUT',
		'LONEUS',
		'LONCOU',
		'LONHOL',
	];
	const [hotelCodesOptions] = useState(hotelCodesOptionsData);
	// Array that holds all the hotel codes//
	const hotelCodesData = ['LONTOW', 'LONPUT', 'LONEUS', 'LONCOU', 'LONHOL'];
	const [hotelCodes] = useState(hotelCodesData);
	// State to use to store all the hotels data//
	const [allHotelsData, setAllHotelsData] = useState([]);
	const [multipleHotel, setMultipleHotel] = useState(null);

	useEffect(() => {
		for (let i = 0; i < hotelCodes.length; i++) {
			axiosInstance
				.get(`?hotel-codes=${hotelCodes[i]}`)
				.then((res) => {
					setAllHotelsData((prev) => [...prev, { ...res.data[0] }]);
				})
				.catch((err) => err);
		}
	}, []);

	const handleChange = (e) => {
		const data = allHotelsData.find(
			(item) => item.hotelCode === e.target.value
		);
		hotelCodesOptions.forEach((item) => {
			if (e.target.value === item) {
				setMultipleHotel([data]);
			} else if (e.target.value === 'All') {
				setMultipleHotel(allHotelsData);
			}
		});
	};

	if (allHotelsData.length < 0) return 'Loading....';
	return (
		<>
			<div className='container'>
				<div className='form mt-3'>
					<select
						className='form-select w-25'
						aria-label='select'
						onChange={handleChange}
						title='selectHotels'
						data-testid='select'>
						{hotelCodesOptions.map((item, index) => (
							<option
								data-testid='select-option'
								key={index}
								value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
				{/* All the hotel codes to show at once and passed in HotelCard component */}
				<div className='row row-cols-4 mt-3'>
					{multipleHotel &&
						multipleHotel.map((item) => (
							<Link
								key={item.hotelCode}
								to={`/hotels/${item.hotelCode}`}>
								<HotelCard
									key={item.locationId}
									name={item.name}
									averageRating={item.rating}
								/>
							</Link>
						))}
				</div>
			</div>
		</>
	);
}

export default Client;
