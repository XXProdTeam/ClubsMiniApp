import axios from 'axios'

const api = axios.create({
	baseURL: 'https://82.202.142.97/api/v1',

	headers: {
		'Content-Type': 'application/json',
	},
})

export default api
