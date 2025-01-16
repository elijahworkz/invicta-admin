import axios from 'axios'
import { ElNotification } from 'element-plus'

export function setupAxios(baseURL) {

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

			// We will let errors be handles by Invicta
			if (status === 422) {
				return Promise.reject(error)
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