import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Formik } from 'formik'
import * as yup from "yup";

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
  terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
});

function CreateUser() {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        clinique: '',
        service: '',
        terms: false,
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="3" controlId="validationFormikcivilite">
              <Form.Label>Civilité</Form.Label>
              <Form.Select
                type="text"
                name="civilite"
                value={values.civilite}
                onChange={handleChange}
                isInvalid={!!errors.civilite}
                //isValid={touched.prenom && !errors.prenom}
              >
              {optionsCivilite.map((option) => (
                <option key={option.label} value={option.value}>{option.label}</option>
                ))
                }
                </Form.Select>
              {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
              <Form.Control.Feedback type="invalid">{errors.civilite}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik01">
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                type="text"
                name="prenom"
                value={values.prenom}
                onChange={handleChange}
                isInvalid={!!errors.prenom}
                //isValid={touched.prenom && !errors.prenom}
              />
              {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
              <Form.Control.Feedback type="invalid">{errors.prenom}</Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group as={Col} md="3" controlId="validationFormik02">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="nom"
                value={values.nom}
                onChange={handleChange}
                isInvalid={!!errors.nom}
                //isValid={touched.nom && !errors.nom}
              />
              <Form.Control.Feedback type="invalid">{errors.nom}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormikUsername">
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
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationFormik03">
              <Form.Label>Téléphone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Téléphone"
                name="telephone"
                value={values.telephone}
                onChange={handleChange}
                isInvalid={!!errors.telephone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.telephone}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormikcivilite">
              <Form.Label>Clinique</Form.Label>
              <Form.Select
                type="text"
                name="clinique"
                value={values.clinique}
                onChange={handleChange}
                isInvalid={!!errors.clinique}
              >
              {optionsClinique.map((option) => (
                <option key={option.label} value={option.value}>{option.label}</option>
                ))
                }
                </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.civilite}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik05">
              <Form.Label>Service</Form.Label>
              <Form.Control
                type="text"
                placeholder="Service"
                name="service"
                value={values.service}
                onChange={handleChange}
                isInvalid={!!errors.service}
              />

              <Form.Control.Feedback type="invalid">
                {errors.service}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Check
              required
              name="terms"
              label="Agree to terms and conditions"
              onChange={handleChange}
              isInvalid={!!errors.terms}
              feedback={errors.terms}
              feedbackType="invalid"
              id="validationFormik0"
            />
          </Form.Group>
          <Button type="submit">Submit form</Button>
        </Form>
      )}
    </Formik>
  );
}

export default CreateUser
