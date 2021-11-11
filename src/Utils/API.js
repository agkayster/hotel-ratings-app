import axios from 'axios';
const endpoint = 'https://api.whitbread.co.uk/reviews';

export const axiosInstance = axios.create({
	baseURL: endpoint,
});
