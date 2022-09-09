import axios from 'axios'
import { ElNotification } from 'element-plus/lib'

export function setupAxios(baseURL: string) {

	const instance = axios.create()

	instance.defaults.withCredentials = true
	instance.defaults.baseURL = baseURL

	instance.interceptors.response.use(
		response => response,
		error => {
			let {
				data,
				status,
				statusText = 'Error',
				message = 'Uknown error occured'
			} = error.response

			if (data && 'message' in data) {
				message = data.message
			}

			let title = `${status}: ${statusText}`

			// Handle Session Timeouts
			if (status === 419) {
				message = 'Session expired. Please reload'
			}

			// Handle server errors
			if (status === 500) {

			}

			ElNotification.error({
				title,
				message,
				duration: 0
			})

			return Promise.reject(error)
		}
	)

	return instance
}