import React, { useEffect } from 'react';
import AxiosInstance from '../../AxiosInstance';
import { useNavigate } from 'react-router-dom';

export default function SignUp(props) {
	const navigate = useNavigate();

	useEffect(() => {
		const response = AxiosInstance.post('user/logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		});
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		AxiosInstance.defaults.headers['Authorization'] = null;
		navigate('/connexion');
		props.handelClick()
		console.log(response)
	});
	return <div>Logout</div>;
}