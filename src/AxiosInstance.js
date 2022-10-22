import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/api/';

const AxiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		Authorization: localStorage.getItem('access_token')
			? 'JWT ' + localStorage.getItem('access_token')
			: null,
		'Content-Type': 'application/json',
		accept: 'application/json',
	}, 
});

AxiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;
		//console.log(error.config)
		if (typeof error.response === 'undefined') {
			alert(
				'A server/network error occurred. ' +
					'Il semble que CORS peut être le problème. ' +
					'Désolé pour ça - Nous allons le résoudre rapidement.'
			);
			return Promise.reject(error);
		}

		if (
			error.response.status === 401 &&
			originalRequest.url === baseURL + 'token/refresh/'
		) {
			window.location.href = '/connexion';
			return Promise.reject(error);
		}
		if(error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'){
			alert("Il semble qu'il ya un problème. Veuillez tout d'abord vider le cache de votre navigateur ensuite, si nécessaire vous connecté.")
		}
		if(error.response.status === 400){
			if(String(error.response.data['email']) === 'utilisateur with this adresse mail already exists.'){
				alert('Un utilisateur avec cette adresse mail existe déjà.')
			}
		}

		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			const refreshToken = localStorage.getItem('refresh_token');
			
			if (refreshToken) {
				console.log(refreshToken)
				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

				// exp date in token is expressed in seconds, while now() returns milliseconds:
				const now = Math.ceil(Date.now() / 1000);
				console.log(tokenParts.exp);

				if (tokenParts.exp > now) {
					return AxiosInstance
						.post('/token/refresh/', { refresh: refreshToken })
						.then((response) => {
							localStorage.setItem('access_token', response.data.access);
							localStorage.setItem('refresh_token', response.data.refresh);

							AxiosInstance.defaults.headers['Authorization'] =
								'JWT ' + response.data.access;
							originalRequest.headers['Authorization'] =
								'JWT ' + response.data.access;

							return AxiosInstance(originalRequest);
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					console.log('Refresh token is expired', tokenParts.exp, now);
					window.location.href = '/connexion';
				}
			} else {
				console.log('Refresh token not available.');
				window.location.href = '/connexion';
			}
		}

		// specific error handling done elsewhere
		return Promise.reject(error);
	}
);

export default AxiosInstance;