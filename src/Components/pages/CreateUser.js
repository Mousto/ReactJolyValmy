import React, { useEffect, useRef, useReducer, useState} from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import "yup-phone";
import AxiosInstance from '../../AxiosInstance';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ModalCreerElu from '../ModalCreerElu';
//import ConfettiExplosion from 'react-confetti-explosion';


const optionSyndicat = [
  {
    label: 'Sélectionner une option',
    value: 'sélection syndicat' 
  },
  {
    label: 'SUD',
    value: 'SUD' 
  },
  {
    label: 'CFDT',
    value: 'CFDT' 
  },
  {
    label: 'CGT',
    value: 'CGT' 
  }
]

const optionsCivilite = [
    {
      label: 'Sélectionner une option',
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
      label: 'Sélectionner une option',
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
const optionFonction = [
    {
      label: 'Sélectionner une option',
      value: 'sélection fonction' 
    },
    {
      label: 'Secrétaire CSE',
      value: 'secrétaire CSE' 
    },
    {
      label: 'Délégué syndical',
      value: 'délégué syndical' 
    },
    {
      label: 'Autre',
      value: 'autre' 
    }
]

function CreateUser() {
  
  const navigate = useNavigate();
  const [cliniques, setCliniques] = useState([])
  const [services, setServices] = useState([])
  const [modalValide, setModalValide] = useState(false)
  //const [isExploding, setIsExploding] = useState(false);
  const servicesTalant = useRef('')
  const servicesValmy = useRef('')
  const compteur = useRef(0)
  const [isElu, eluDispatch] = useReducer(eluReducer, false)

  function eluReducer(state, action){
    switch(action.type){
        case 'Oui':
          state = true
          return state
            
        case 'Non':
          state = false
          return  state
        default:
          throw new Error('hors des clous !')
    }
}
  
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
    /* syndicat: yup.string().required('sélectionnez une option'),
    fonction: yup.string().required('fonction requise'),
    message: yup.string().required('fonction requise'),
    photo: yup.string(),
    dispo: yup.bool(), */
    password: yup.string()
        .min(8,'minimum 8 caractères')
        .required("mot de passe requis"),
    confirm_password: yup.string()
        .required('confirmation requise')
        .oneOf(
        [yup.ref('password'), null],
          'confirmation non identique',
        ),
    /* terms: yup.bool().required('ce champs est obligatire').oneOf([true], 'Termes à acceptés'), */
  });

  //console.log(schema.fields.telephone)
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    values, // à utiliser si on veut des controlled components
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
      syndicat: optionSyndicat[0].value,
      fonction: optionFonction[0].value,
      message: 'Bonjour',
      photo: 'No pic',
      dispo: true,
      password: '',
      confirm_password: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log('je soumet le formulaire')
      let personnel = '',
            personnelElu = '';
      if(values.elu !== 'Oui'){
        personnel = {
          civilite: values.civilite,
          first_name: values.prenom,
          user_name: values.nom,
          email: values.email,
          phone: values.phone,
          la_clinique: parseInt(values.la_clinique),
          le_service: parseInt(values.le_service),
          password: values.password,
          elu: false,
        }
      }else{
        personnelElu = {
          civilite: values.civilite,
          first_name: values.prenom,
          user_name: values.nom,
          email: values.email,
          phone: values.phone,
          la_clinique: parseInt(values.la_clinique),
          le_service: parseInt(values.le_service),
          syndicat: values.syndicat,
          photo: values.photo === 'No pic' ? null : values.photo,
          fonction: values.fonction,
          message_aux_collègues: values.message,
          disponible: values.dispo,
          password: values.password,
          elu: true,
        }
        console.log(personnelElu.photo)
      }
      AxiosInstance
			.post(`userCreate/`, personnel !=='' ? personnel : personnelElu)
			.then((res) => {
        //navigate('/');//Vers accueil
        //navigate(-1);//Vers la page précédente
        //navigate('../succes-new-user')
        //setIsExploding(true)
				console.log(res);
			})
      navigate('../succes-new-user')
      console.log(JSON.stringify(values));
    },
  });
  
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
    if(values.la_clinique !== '' && values.la_clinique !== '0'){
      if(values.la_clinique === '1'){ // Si clinique 1 sélectionnée, service correspondants
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

    if(values.elu !== ''){
      if(values.elu === 'Oui'){
        if(compteur.current === 0){
          eluDispatch({type: 'Oui'})
        }
      }else{
        eluDispatch({type: 'Non'})
        compteur.current = 0
      }
    }
    //console.log(values.message)
  }, [values.la_clinique, values.elu, isElu, cliniques.length, values.syndicat, values.fonction])
 
  function fermeModal(e){
    eluDispatch({type: 'Non'})
    compteur.current = 1
    if(e.target.value === 'Ennuler modal'){
      values.message = ''
      values.syndicat = optionSyndicat[0].value
      values.fonction = optionFonction[0].value
      values.elu = eluSyndicat[2].value
    }else{
      setModalValide(true)
    }
  }

  return (
    <div className="conteneur-form mx-auto mt-5">
      <div className="conteneur-form2 d-flex flex-column mx-auto shadow-lg">
        <h1 className="mx-auto">Création de compte</h1>
        {/* {isExploding && <ConfettiExplosion />} */}
        <Form noValidate onSubmit={handleSubmit}>
          <div className="modalElu">
            <ModalCreerElu 
              visible={isElu}
              handleHide={(e) => fermeModal(e)}
              syndicat= {optionSyndicat} 
              fonction= {optionFonction} 
              syndicatValue={values.syndicat}
              syndicatFonction={values.fonction}
              syndicatMessage={values.message}
              touched={touched}
              errors={errors}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          </div>
          
          <Row>
            <Form.Group as={Col} md="6" className="mb-2" controlId="validationFormikcivilite">
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
            <Form.Group as={Col} md="6" className="mb-2" controlId="validationFormikPrenom">
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
            <Form.Group as={Col} md="6" className="mb-2" controlId="validationFormikNom">
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
            <Form.Group as={Col} md="6" className="mb-2" controlId="validationFormikEmail">
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
          <Row>
              <Form.Group as={Col} md="6" className="mb-2" controlId="validationFormikTelephone">
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
              <Form.Group as={Col} md="6" className="mb-2" controlId="validationFormikClinique">
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
              <Form.Group as={Col} md="6" className="mb-2" controlId="validationFormikService">
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
                {touched.le_service && errors.le_service? 
                    <Form.Control.Feedback type="invalid">{errors.le_service}</Form.Control.Feedback> : 
                    null
                }
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-2" controlId="validationFormikElu">
                <Form.Label>êtes vous représentant syndical ?</Form.Label>
                <Form.Select
                  id='elu'
                  type="text"
                  name="elu"
                  value={values.elu}
                  disabled={modalValide}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.elu&& errors.elu}
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
            <Row>
            <Form.Group as={Col} md="6" className="mb-2" controlId="validationFormikpassword">
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
            <Form.Group as={Col} md="6" className="mb-2" controlId="validationFormikconfirm_p">
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
                    <Form.Control.Feedback type="invalid">{errors.confirm_password}</Form.Control.Feedback> : null
                }
            </Form.Group>
            </Row>
            {/* <Form.Group className="mb-3">
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
            </Form.Group> */}
          <Row >
            <div as={Col} className="d-flex justify-content-center">
              <Button className="m-2" size="lg" type="submit">Créer le compte</Button>
            </div>
          </Row>  
        </Form> 
      </div> 
    </div>  
  );
}

export default CreateUser;