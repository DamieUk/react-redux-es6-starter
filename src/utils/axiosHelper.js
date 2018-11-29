import axios from 'axios';

const defaultHeaders = () => {
	const token = localStorage.getItem('_t');
	return {
		Authorization: !token ? null : `Bearer ${token}`,
		'content-type': 'application/json',
	}
};

export const GET = (url = '', params = {}) => axios
		.get(url, { params, headers: defaultHeaders() })
		.then(res => res.data);

export const POST = (url = '', data = {}) => axios
		.post(url, data, { headers: defaultHeaders() })
		.then(res => res.data);

