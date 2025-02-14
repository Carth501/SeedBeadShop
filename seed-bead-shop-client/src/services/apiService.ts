import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000/api';

export const fetchProducts = async () => {
	try {
		const response = await axios.get(`${API_BASE_URL}/products`);
		return response.data;
	} catch (error) {
		console.error('Error fetching products:', error);
		throw error;
	}
};

export const fetchImage = async (filename: string) => {
	console.log('Fetching image:', filename);
	try {
		const response = await axios.get(`${API_BASE_URL}/assets/${filename}`, {
			responseType: 'blob',
		});
		return URL.createObjectURL(response.data);
	} catch (error) {
		console.error('Error fetching image:', error);
		throw error;
	}
};

export const fetchShowcase = async () => {
	try {
		const response = await axios.get(`${API_BASE_URL}/showcase`);
		return response.data;
	} catch (error) {
		console.error('Error fetching showcase:', error);
		throw error;
	}
};
