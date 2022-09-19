import React, { useState } from 'react';
import AxiosInstance from '../../AxiosInstance';
import { useNavigate } from 'react-router-dom';
import Message from './../Message'
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useFormik } from "formik";
import * as yup from "yup";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';



function Connexion (props){

    const schema = yup.object().shape({
        email: yup.string()
            .email("email invalide")
            .required("l'email est obligatoire"),
        password: yup.string()
        .min(8,'passe inconnu')
            .required("mot de passe requis"),
      });
  
    const {
      handleSubmit,
      handleChange,
      handleBlur,
      touched,
      values, // use this if you want controlled components
      errors,
    } = useFormik({
      initialValues: {
          email: '',
          password: '',
        },
      validationSchema: schema,
      onSubmit: (values) => {

        AxiosInstance
			.post(`token/`, {
				email: values.email,
				password: values.password,
			})
			.then((res) => {
                localStorage.setItem('access_token', res.data.access);
				localStorage.setItem('refresh_token', res.data.refresh);
				AxiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');
                //navigate('/');//Vers accueil
                navigate(-1);//Vers la page précédente
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

        console.log(JSON.stringify(values));
      },
    });

    const navigate = useNavigate();
	const [isError, setIsError] = useState(false);
	const [isServerError, setIsServerError] = useState(false);
    const[showPwd, setShowPwd]= useState(false);



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
                                            <h3 className="login-heading mb-4">Connectez-vous pour continuer</h3>
                                        </div>

                                        {/* <!-- Sign In Form --> */}
                                        <Form onSubmit={handleSubmit}>
                                            {
                                            isError && 
                                            <div className="form-floating mb-3 div-erreur-connexion p-2" style={styles}>
                                                Veuillez entrer l'email et le mot de passe correctes pour un compte personnel. Noter que les deux champs peuvent être sensibles à la casse.
                                            </div>
                                            }
                                            <div className="form-floating mb-3">
                                                <Form.Group controlId="validationFormikUsername">
                                                    <Form.Label>Email</Form.Label>
                                                    <InputGroup hasValidation>
                                                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                                        <Form.Control
                                                        type="text"
                                                        placeholder="Votre email"
                                                        aria-describedby="inputGroupPrepend"
                                                        name="email"
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={touched.email && errors.email}
                                                        />
                                                        {touched.email && errors.email ? 
                                                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback> : 
                                                            null
                                                        }
                                                    </InputGroup>
                                                </Form.Group>
                                            </div>
                                            <div className="form-floating mb-3">
                                                    <Form.Group controlId="validationFormikPassword">
                                                    <Form.Label>Mot de passe</Form.Label>
                                                    <InputGroup hasValidation>
                                                        <Form.Control
                                                            className='password'
                                                            type={(showPwd) ? "text" : "password"}
                                                            placeholder='Votre mot de passe'
                                                            name="password"
                                                            value={values.password}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            isInvalid={touched.password && errors.password}
                                                        />
                                                        <InputGroup.Text 
                                                        id="inputGroupAppend"
                                                        onClick={() => setShowPwd(!showPwd)}
                                                        >
                                                            { showPwd ? <FaEye /> : <FaEyeSlash />} 
                                                        </InputGroup.Text>
                                                    </InputGroup>
                                                    {touched.password && errors.password ? 
                                                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback> : 
                                                        null
                                                    }
                                                </Form.Group>
                                            </div>
                                            <div className="form-check mb-3">
                                                <input 
                                                    className="form-check-input" 
                                                    type="checkbox" 
                                                    value="" 
                                                    id="rememberPasswordCheck"
                                                />
                                                <label className="form-check-label" htmlFor="rememberPasswordCheck">
                                                    Remember password
                                                </label>
                                            </div>

                                            <div className="d-grid">
                                                <button 
                                                    className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" 
                                                    type="submit"
                                                >Se connecter
                                                </button>
                                                <div className="text-center">
                                                    <a className="small" href="#">Mot de passe oublié?</a>
                                                </div>
                                            </div>

                                        </Form>
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