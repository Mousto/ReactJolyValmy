import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';



function Test() {
  const schema = yup.object().shape({
      email: yup.string()
          .email("email invalide")
          .required("l'email est obligatoire"),
      password: yup.string()
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
      console.log(JSON.stringify(values));
    },
  });

  return (
    <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
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
                {touched.password && errors.password ? 
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback> : 
                    null
                }
              </Form.Group>
            </Row>
            
            <Button type="submit">Submit form</Button>
        </Form>    
  );
}
export default Test;