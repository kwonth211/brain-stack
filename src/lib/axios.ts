import Axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export const axios = Axios.create({
	baseURL: apiUrl,
	headers: {
		'Content-Type': 'application/json'
	}
});
