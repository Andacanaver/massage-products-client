import config from '../config'

const AuthApiService = { 
    postLogin({ username, password }) {
        return fetch(`${config.API_ENDPOINT}/auth/login`, {
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({ username, password })
		})
    },
    postUser(user) {
        return fetch(`${config.API_ENDPOINT}/users`, {
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify(user)
		})
	}
	
}
export default AuthApiService
