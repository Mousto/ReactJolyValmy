import React, { useEffect, useRef} from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup'
import "yup-phone";
import AxiosInstance from '../../AxiosInstance';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const optionsCivilite = [
    {
      label: 'Séléctionner une option',
      value: 'sélection civilité' 
    },
    {
      label: 'Madame',
      value: 'Madame' 
    },
    {
      label: 'Monsieur',
      value: 'Monsieur' 
    }
]

const eluSyndicat = [
    {
      label: 'Séléctionner une option',
      value: 'sélection statutElu' 
    },
    {
      label: 'Oui',
      value: 'Oui' 
    },
    {
      label: 'Non',
      value: 'Non' 
    }
]

function CreateUser() {

  const navigate = useNavigate();
  const [cliniques, setCliniques] = React.useState([])
  const [services, setServices] = React.useState([])
  const servicesTalant = useRef('')
  const servicesValmy = useRef('')
  
  const schema = yup.object().shape({
    civilite: yup.string().required('sélectionnez une option'),
    prenom: yup.string().required('le prénom est requis'),
    nom: yup.string().required('le nom est requis'),
    email: yup.string()
        .email("email invalide")
        .required("l'email est obligatoire"),
    phone: yup.string().phone('FR', true, 'Téléphone invalide').required('numéro requis'),
    la_clinique: yup.string().required('clinique requise'),
    le_service: yup.string().required('service requis'),
    elu: yup.string().required('sélectionnez une option'),
    password: yup.string()
        .min(8,'minimum 8 caractères')
        .required("mot de passe requis"),
    confirm_password: yup.string()
        .required('confirmation requise')
        .oneOf(
        [yup.ref('password'), null],
          'confirmation non identique',
        ),
    terms: yup.bool().required('ce champs est obligatire').oneOf([true], 'Termes à acceptés'),
  });

  
  //console.log(schema.fields.telephone)
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    values, // use this if you want controlled components
    errors,
  } = useFormik({
    initialValues: {
        civilite: '',
        prenom: '',
        nom: '',
        email: '',
        phone: '',
        la_clinique: '',
        le_service: '',
        elu: '',
        password: '',
        confirm_password: '',
      },
    validationSchema: schema,
    onSubmit: (values) => {

      AxiosInstance
			.post(`userCreate/`, {
				civilite: values.civilite,
				first_name: values.prenom,
				user_name: values.nom,
				email: values.email,
				phone: values.phone,
				la_clinique: parseInt(values.la_clinique),
				le_service: parseInt(values.le_service),
				password: values.password,
        elu: values.elu === 'Oui' && true,
			})
			.then((res) => {
        //navigate('/');//Vers accueil
        navigate(-1);//Vers la page précédente
        //props.handelClick()
				console.log(res);
			})
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          //console.log('Erreur', error.message);
        }
        //console.log(error.config);
      });
      console.log(JSON.stringify(values));
    },
  });

  //const [selectedClinique, setSelectedClinique] = React.useState(values.la_clinique)
  
  useEffect(() => {
    if(cliniques.length === 0){ 
      axios.get(`http://127.0.0.1:8000/api/cliniques`)
      .then(res => {
        const ar = {
          id: 0,
          nom_clinique: 'Sélectionner une clinique',
        }
        // Services correspondant à la première clinique 
        axios.get(`http://127.0.0.1:8000/api/serviceParClinique-list/${res.data[0]['id']}`)
        .then(resultTalant => {
          let arT = {
            id: 0,
            nom_service: 'Sélectionner un service',
          }
          resultTalant.data.unshift(arT)
          servicesTalant.current = resultTalant.data
        })
        // Services correspondant à la deuxième clinique
        axios.get(`http://127.0.0.1:8000/api/serviceParClinique-list/${res.data[1]['id']}`)
        .then(resultValmy => {
          let arV = {
            id: 0,
            nom_service: 'Sélectionner un service',
          }
          resultValmy.data.unshift(arV)
          servicesValmy.current = resultValmy.data
        })
        //Chargement des cliniques
        res.data.unshift(ar)
        setCliniques(res.data)
      })
      
    }
    if(values.la_clinique !== '' && values.la_clinique != 0){
      if(values.la_clinique == 1){ // Si clinique 1 sélectionnée, service correspondants
        setServices(servicesTalant.current)
      }else{ // Si clinique 2 sélectionnée, service correspondants
        setServices(servicesValmy.current)
      }
    }
    else{
      setServices([{
        id: 0,
        nom_service: 'Sélectionner au préalable une clinique',
      }])
    }
  }, [values.la_clinique])
  
  return (
    <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="3" controlId="validationFormikcivilite">
              <Form.Label>Civilité</Form.Label>
              <Form.Select
                type="text"
                name="civilite"
                value={values.civilite}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.civilite && errors.civilite}
              >
              {optionsCivilite.map((option) => (
                <option key={option.label} value={option.value}>{option.label}</option>
                ))
                }
                </Form.Select>
              {touched.civilite && errors.civilite ? <Form.Control.Feedback type="invalid">{errors.civilite}</Form.Control.Feedback> : null}
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormikPrenom">
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                type="text"
                name="prenom"
                value={values.prenom}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.prenom && errors.prenom}
              />
              {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                {touched.prenom && errors.prenom ? 
                    <Form.Control.Feedback type="invalid">{errors.prenom}</Form.Control.Feedback> : 
                    null
                }
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormikNom">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="nom"
                value={values.nom}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.nom && errors.nom}
              />
              {touched.nom && errors.nom ? 
                    <Form.Control.Feedback type="invalid">{errors.nom}</Form.Control.Feedback> : 
                    null
                }
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormikEmail">
              <Form.Label>Email</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Email"
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
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="3" controlId="validationFormikTelephone">
                <Form.Label>Téléphone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Téléphone"
                  name="phone"
                  value={values.phone.trim()}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.phone && errors.phone}
                />
                {touched.phone && errors.phone ? 
                      <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback> : 
                      null
                  }
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationFormikClinique">
                <Form.Label>Clinique</Form.Label>
                <Form.Select
                  type="text"
                  name="la_clinique"
                  value={values.la_clinique}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.la_clinique && errors.la_clinique}
                >
                {cliniques.map((option) => (
                  <option key={option.id} value={option.id}>{option.nom_clinique}</option>
                  ))
                  }
                </Form.Select>
                  {touched.la_clinique && errors.la_clinique ? 
                      <Form.Control.Feedback type="invalid">{errors.la_clinique}</Form.Control.Feedback> : 
                      null
                  }
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationFormikService">
                <Form.Label>Service</Form.Label>
                <Form.Select
                  type="text"
                  placeholder="Service"
                  name="le_service"
                  value={values.le_service.trim()}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.le_service && errors.le_service}
                >
                  {services.map((option) => (
                  <option key={option.id} value={option.id}>{option.nom_service}</option>
                  ))
                  }
                </Form.Select>
                {touched.le_service && errors.le_service ? 
                    <Form.Control.Feedback type="invalid">{errors.le_service}</Form.Control.Feedback> : 
                    null
                }
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationFormikElu">
                <Form.Label>êtes vous représentant syndical ?</Form.Label>
                <Form.Select
                  type="text"
                  name="elu"
                  value={values.elu}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.elu && errors.elu}
                >
                  {eluSyndicat.map((option) => (
                    <option key={option.label} value={option.value}>{option.label}</option>                 
                  ))
                  }
                </Form.Select>
                {touched.elu && errors.elu ? 
                    <Form.Control.Feedback type="invalid">{errors.elu}</Form.Control.Feedback> : 
                    null
                }
              </Form.Group>
            </Row>
            <Row className="mb-3">
            <Form.Group as={Col} md="2" controlId="validationFormikpassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                    type="text"
                    name="password"
                    value={values.password.trim()}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && errors.password}
                />
                {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                    {touched.password && errors.password ? 
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback> : 
                        null
                    }
            </Form.Group>
            <Form.Group as={Col} md="2" controlId="validationFormikconfirm_p">
                <Form.Label>Confirmer mot de passe</Form.Label>
                <Form.Control
                    type="text"
                    name="confirm_password"
                    value={values.confirm_password.trim()}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.confirm_password && errors.confirm_password}
                />
                {touched.confirm_password && errors.confirm_password ? 
                    <Form.Control.Feedback type="invalid">{errors.confirm_password}</Form.Control.Feedback> : 
                    null
                }
            </Form.Group>
            </Row>
            <Form.Group className="mb-3">
                <Form.Check
                required
                name="terms"
                value={values.terms}
                label="Accepter les termes et conditions"
                onChange={handleChange}
                isInvalid={!!errors.terms}
                feedback={errors.terms}
                feedbackType="invalid"
                id="validationFormikTermsEtConditions"
                />
            </Form.Group>
            <Button type="submit">Créer le compte</Button>
        </Form>    
  );
}

export default CreateUser;