import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';

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
const optionsClinique = [
    {
      label: 'Séléctionner une option',
      value: 'sélection clinique' 
    },
    {
      label: 'Clinique Talant',
      value: 'Talant' 
    },
    {
      label: 'SSR Valmy',
      value: 'Valmy' 
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
    const schema = yup.object().shape({
        civilite: yup.string().required('sélectionnez une option'),
        prenom: yup.string().required('le prénom est requis'),
        nom: yup.string().required('le nom est requis'),
        email: yup.string()
            .email("email invalide")
            .required("l'email est obligatoire"),
        telephone: yup.string().required('numéro requis'),
        clinique: yup.string().required('clinique requise'),
        service: yup.string().required('service requis'),
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
        telephone: '',
        clinique: '',
        service: '',
        elu: '',
        password: '',
        confirm_password: '',
      },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values));
    },
  });

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
                  name="telephone"
                  value={values.telephone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.telephone && errors.telephone}
                />
                {touched.telephone && errors.telephone ? 
                      <Form.Control.Feedback type="invalid">{errors.telephone}</Form.Control.Feedback> : 
                      null
                  }
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationFormikClinique">
                <Form.Label>Clinique</Form.Label>
                <Form.Select
                  type="text"
                  name="clinique"
                  value={values.clinique}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.clinique && errors.clinique}
                >
                {optionsClinique.map((option) => (
                  <option key={option.label} value={option.value}>{option.label}</option>
                  ))
                  }
                  </Form.Select>
                  {touched.clinique && errors.clinique ? 
                      <Form.Control.Feedback type="invalid">{errors.clinique}</Form.Control.Feedback> : 
                      null
                  }
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationFormikService">
                <Form.Label>Service</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Service"
                  name="service"
                  value={values.service}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.service && errors.service}
                />
                  {touched.service && errors.service ? 
                      <Form.Control.Feedback type="invalid">{errors.service}</Form.Control.Feedback> : 
                      null
                  }
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationFormikElu">
                <Form.Label>Représentant syndical ?</Form.Label>
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
                    value={values.password}
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
                    value={values.confirm_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.confirm_password && errors.confirm_password}
                />
                {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
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