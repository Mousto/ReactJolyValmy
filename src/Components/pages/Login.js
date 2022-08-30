// import Component from the react module
import React, { useState } from 'react';
import AxiosInstance from '../../AxiosInstance';
import { useNavigate } from 'react-router-dom';


function Login(){

  const navigate = useNavigate();
	
  const initialFormData = Object.freeze({
		username: '',
		password: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		AxiosInstance
			.post(`token/`, {
				username: formData.username,
				password: formData.password,
			})
			.then((res) => {
        localStorage.setItem('access_token', res.data.access);
				localStorage.setItem('refresh_token', res.data.refresh);
				AxiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');
				navigate('/');//Vers accueil
				console.log(res);
				console.log(res.data);
			});
	};

    return(
      <React.StrictMode>
        <div className="div-connexion-form d-flex justify-content-center align-items-center">
          <form>
          <h3>Connexion</h3>
          <div className="mb-3">
            <label>Votre nom</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Entrer le nom"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Mot de passe</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Votre mot de passe"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Souviens toi de moi
              </label>
            </div>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          <p className="forgot-password text-right">
              Oublié <a href="#">password?</a>
          </p>
        </form>
      </div>
      </React.StrictMode>
    )
  }
  export default Login