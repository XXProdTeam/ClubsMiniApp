import axios from 'axios'

const api = axios.create({
	baseURL: 'http://82.202.142.97:8000/api/v1',

	headers: {
		'Content-Type': 'application/json',
	},
})

export default api
