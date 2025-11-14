import axios from 'axios'

const api = axios.create({
	baseURL: 'https://hack.fadegor05.ru/api/v1',

	headers: {
		'Content-Type': 'application/json',
	},
})

export default api
