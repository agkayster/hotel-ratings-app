import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HotelCard from '../common/HotelCard';
import { Link } from 'react-router-dom';

function Client() {
	const hotelCodesOptions = [
		'All',
		'LONTOW',
		'LONPUT',
		'LONEUS',
		'LONCOU',
		'LONHOL',
	]; // Array that holds all the hotel codes options//
	const hotelCodes = ['LONTOW', 'LONPUT', 'LONEUS', 'LONCOU', 'LONHOL']; // Array that holds all the hotel codes//
	const [allHotelsData, setAllHotelsData] = useState([]); // State to use to store all the hotels data//
	const [singleHotel, setSingleHotel] = useState(null); // state that holds each hotel data//
	const [multipleHotel, setMultipleHotel] = useState(null);

	useEffect(() => {
		for (let i = 0; i < hotelCodes.length; i++) {
			axios
				.get(
					`https://api.whitbread.co.uk/reviews?hotel-codes=${hotelCodes[i]}`
				)
				.then((res) => {
					setAllHotelsData((prev) => [...prev, { ...res.data[0] }]);
				});
		}
	}, []);

	const handleChange = (e) => {
		const data = allHotelsData.find(
			(item) => item.hotelCode === e.target.value
		);
		hotelCodesOptions.forEach((item) => {
			if (e.target.value === item) {
				setSingleHotel(data);
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
						onChange={handleChange}>
						{hotelCodesOptions.map((item, index) => (
							<option key={index} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
				{/* All the hotel codes to show at once and passed in HotelCard component */}
				<div className='row row-cols-4 mt-3'>
					{multipleHotel &&
						multipleHotel.map((item) => (
							<Link to={`/hotels/${item.hotelCode}`}>
								<HotelCard
									key={item.locationId}
									name={item.name}
									averageRating={item.rating}
								/>
							</Link>
						))}
				</div>
				{/* Each individual hotel code passed in HotelCard component */}
				<div className='row row-cols-4 mt-3'>
					{singleHotel && (
						<Link to={`/hotels/${singleHotel.hotelCode}`}>
							<HotelCard
								key={singleHotel.locationId}
								name={singleHotel.name}
								averageRating={singleHotel.rating}
							/>
						</Link>
					)}
				</div>
			</div>
		</>
	);
}

export default Client;

// const [eachHotelsData, setEachHotelsData] = useState([]); // state that holds each hotel data//
// const [allHotels, setAllHotels] = useState([]);
// const [allHotelsData, setAllHotelsData] = useState([]); // State to use to store all the hotels data//
// const [eachHotelCode, setEachHotelCode] = useState(''); // State that holds each hotel code and passes it to axios//

// useEffect(() => {
// 	// axios get request, passing in each of the hotel codes to get the data//
// 	const getHotels = async () => {
// 		let res = await axios.get(
// 			`https://api.whitbread.co.uk/reviews?hotel-codes=${eachHotelCode}`
// 		);
// 		setEachHotelsData(res.data);
// 	};
// 	// This is where I am having the challenge//
// 	setAllHotelsData([...allHotelsData, ...eachHotelsData]);
// 	getHotels();
// }, [eachHotelCode]);

// // The example hotel codes//
// const hotelCodes = [
// 	{
// 		id: 0,
// 		name: 'All',
// 	},
// 	{
// 		id: 1,
// 		name: 'LONTOW',
// 	},
// 	{
// 		id: 2,
// 		name: 'LONPUT',
// 	},
// 	{
// 		id: 3,
// 		name: 'LONEUS',
// 	},
// 	{
// 		id: 4,
// 		name: 'LONCOU',
// 	},
// 	{
// 		id: 5,
// 		name: 'LONHOL',
// 	},
// ];

// const handleChange = (e) => {
// 	// To map each hotel code to e.target.value//
// 	hotelCodes.forEach((item) => {
// 		console.log('Hotel Names: ', item.name);
// 		if (e.target.value === item.name) {
// 			setEachHotelCode(e.target.value);
// 		} else if (e.target.value === 'All') {
// 			// setAllHotels(allHotelsData.map((item) => item));
// 			setAllHotels([...allHotelsData]);
// 		}
// 	});
// };

// console.log('get hotels data', eachHotelsData);
// console.log('all the hotel codes =>', hotelCodes);
// console.log('make sure get all hotels =>', allHotelsData);
// console.log('get data', allHotels);
