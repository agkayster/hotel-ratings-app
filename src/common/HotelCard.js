const HotelCard = ({ name, averageRating }) => {
	return (
		<>
			{/* Received name and averageRating as props from Client component */}
			<div className='col mt-3'>
				<div className='card' style={{ width: '15rem' }}>
					<div className='card-body'>
						<h5 className='card-title'>{name}</h5>
					</div>
					<div className='card-footer'>
						Average rating: {averageRating}
					</div>
				</div>
			</div>
		</>
	);
};

export default HotelCard;
