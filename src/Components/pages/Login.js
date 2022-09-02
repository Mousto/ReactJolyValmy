// import Component from the react module
import React, { useState } from 'react';
import AxiosInstance from '../../AxiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';



function Login(){

  
  const initialFormData = Object.freeze({
		username: '',
		password: '',
	});
  const navigate = useNavigate();
	const [formData, updateFormData] = useState(initialFormData);
	const [isError, setIserror] = useState(false);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

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
				//console.log(res);
				//console.log(res.data);
			})
      .catch(error => { 
        if(error.request.status === 401){
          setIserror(true)
        }
      })
      
	};
  const styles = {
    borderColor: isError ? 'red' : '', 
    color: isError ? 'red' : '', 
  }
  return(
    <React.StrictMode>
      <div className="div-connexion-form  justify-content-center      align-items-center mx-auto mt-5 p-3">
        <form>
          <h3>Connexion</h3>
          {
            isError && 
            <div className="div-erreur-connexion mb-3 p-2" style={styles}>
              Veuillez entrer le nom d'utilisateur et le mot de passe correctes pour un compte personnel. Noter que les deux champs peuvent être sensibles à la casse.
              </div>
            }
          <div className="div-champs-connexion">
            <div className="mb-3">
              <label>Votre nom</label>
              <input
                /* style={styles} */
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
                /* style={styles} */
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
                <label className="custom-control-label mx-1" htmlFor="customCheck1">
                  Souviens toi de moi
                </label>
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                Submit
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
                Oublié <a href="#">password?</a>
            </p>
          </div>
        </form>
       {/*  {isError && <Message 
                      variant='danger' 
                      titre='Compte inexistant' 
                      message="Vérifiez vos informations et réessayer"
                      username={formData.username}
                      password={formData.password}
                      handelClick={toastClose}
                    />}  */}
      </div>
      </React.StrictMode>
    )
  }
  export default Login