import _ from 'lodash';
// Passing item, onhandleFilterChange, onSearchTerm, onSortTerm as props from Show component//
const ShowHotelCard = ({
	item,
	onhandleFilterChange,
	onSearchTerm,
	onSortTerm,
}) => {
	const filterHotel = () => {
		const reviews = item.reviews;
		const re = new RegExp(onSearchTerm, 'i');
		const [field, order] = onSortTerm.split('|');
		const hotelsFilter = _.filter(reviews, (item) => {
			return re.test(item.rating) || re.test(item.publishedDate);
		});
		const sortedHotels = _.orderBy(hotelsFilter, [field], [order]);

		return sortedHotels;
	};

	const handleFilterChange = (e) => {
		onhandleFilterChange(e.target.value);
	};

	// Assigning parameters to variable names//
	const name = item.name;
	const address = item.address;
	const hotelCode = item.hotelCode;
	const avgRating = item.rating;

	return (
		<>
			{/* Received item as props from Show component */}
			<div className='col'>
				<div
					className='card text-dark bg-warning'
					style={{ width: '100%' }}>
					<div className='card-header fw-bold'>{name}</div>
					<div className='card-body'>
						<h5>{address}</h5>
						<p>
							<span className='fw-bold'>Hotel Code</span>:{' '}
							{hotelCode}
						</p>
						<p>
							<span className='fw-bold'>Average Rating</span>:{' '}
							{avgRating}
						</p>
						{/* Select is where the sort logic is carried out */}
						<div className='form mt-3'>
							<select
								className='form-select w-25'
								aria-label='select'
								onChange={handleFilterChange}>
								<option value='all' key='all'>
									All
								</option>
								<option value='rating|desc' key='desc'>
									Rating Best-Worst
								</option>
								<option value='rating|asc' key='asc'>
									Rating Worst-Best
								</option>
								<option value='publishedDate|desc' key='date'>
									Date A-Z
								</option>
								<option
									value='publishedDate|asc'
									key='published'>
									Date Z-A
								</option>
							</select>
						</div>
					</div>
					{/* filterHotel is mapped into here to carry along the sort logic */}
					<ul className='list-group list-group-flush'>
						{filterHotel().map((item, index) => (
							<li className='list-group-item' key={index}>
								<div className='fw-bold'>Review</div>
								<ul className='list-group list-group-flush'>
									<li className='list-group-item'>
										<span className='fw-bold'>User</span>:{' '}
										{item.user.username}
									</li>
									<li className='list-group-item'>
										<span className='fw-bold'>
											Trip Type
										</span>
										:{' '}
										{item.tripType === null
											? 'No Trip Type'
											: item.tripType}
									</li>
									<li className='list-group-item'>
										<span className='fw-bold'>Title</span>:{' '}
										{item.title}
									</li>
									<li className='list-group-item'>
										<span className='fw-bold'>Text</span>:{' '}
										{item.text}
									</li>
									<li className='list-group-item'>
										<span className='fw-bold'>Rating</span>:{' '}
										{item.rating}
									</li>
									<li className='card-footer list-group-item'>
										<span className='fw-bold'>Date</span>:{' '}
										{new Date(
											item.publishedDate
										).toUTCString()}
									</li>
								</ul>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default ShowHotelCard;
