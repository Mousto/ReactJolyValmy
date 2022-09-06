import React, { useState } from 'react';
import AxiosInstance from '../../AxiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';
import Message from './../Message'
import { FaUser } from 'react-icons/fa';



function Connexion (props){

    const initialFormData = Object.freeze({
		email: '',
		password: '',
	});
  const navigate = useNavigate();
	const [formData, updateFormData] = useState(initialFormData);
	const [isError, setIsError] = useState(false);
	const [isServerError, setIsServerError] = useState(false);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			// On enlève les espaces vides
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		AxiosInstance
			.post(`token/`, {
				email: formData.email,
				password: formData.password,
			})
			.then((res) => {
                localStorage.setItem('access_token', res.data.access);
				localStorage.setItem('refresh_token', res.data.refresh);
				AxiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');
                navigate('/');//Vers accueil
                props.handelClick()
				//console.log(res);
			})
            .catch(function (error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  setIsError(true)
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  setIsServerError(true)
                  //console.log('Erreur', error.message);
                }
                console.log(error.config);
              });
      /* .catch(error => {
        // console.log(error)
        if(error.request.status === 401){
          setIserror(true)
        }
      }) */
      
	};
  const styles = {
    borderColor: isError ? 'red' : '', 
    color: isError ? 'red' : '', 
  }

    return (
        <React.StrictMode>
            <div className="container-fluid ps-md-0">
                <div className="row g-0">
                    <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
                    <div className="col-md-8 col-lg-6">
                    <div className="login d-flex align-items-center py-5">
                        <div className="container">
                        <div className="row">
                            <div className="col-md-9 col-lg-8 mx-auto">
                                <div className="icon-user d-flex align-items-center flex-column">
                                    <h2 className=''><FaUser /></h2>
                                    <h3 className="login-heading mb-4"> Bienvenu-e !</h3>
                                </div>

                            {/* <!-- Sign In Form --> */}
                            <form>
                                {
                                isError && 
                                <div className="form-floating mb-3 div-erreur-connexion p-2" style={styles}>
                                    Veuillez entrer le nom d'utilisateur et le mot de passe correctes pour un compte personnel. Noter que les deux champs peuvent être sensibles à la casse.
                                </div>
                                }
                                <div className="form-floating mb-3">
                                    <input 
                                        type="email"
                                        name="email" 
                                        className="form-control" 
                                        id="floatingInput" 
                                        placeholder="name@example.com"
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="floatingInput">Adresse mail</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="password" 
                                        name="password"
                                        className="form-control" 
                                        id="floatingPassword" 
                                        placeholder="Password"
                                        onChange={handleChange}
                                     />
                                    <label htmlFor="floatingPassword">Mot de passe</label>
                                </div>
                                <div className="form-check mb-3">
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        value="" 
                                        id="rememberPasswordCheck"
                                    />
                                    <label className="form-check-label"             htmlFor="rememberPasswordCheck">
                                        Remember password
                                    </label>
                                </div>

                                <div className="d-grid">
                                    <button 
                                        className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" 
                                        type="submit"
                                        onClick={handleSubmit}
                                    >Se connecter
                                    </button>
                                    <div className="text-center">
                                        <a className="small" href="#">Mot de passe oublié?</a>
                                    </div>
                                </div>

                            </form>
                            {
                                isServerError &&
                                 <Message message="Désolé nous ne pouvons répondre à votre requête actuellement. Veuillez recommncer ultérieurement." variant="info" titre='Erreur serveur/réseaux'/>
                            }
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </React.StrictMode>
    )
}
export default Connexion