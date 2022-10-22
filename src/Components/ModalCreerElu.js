import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

function ModalCreerElu(props) {
  
  function fermetureModal(e){
    //console.log(e.target.value)
    props.handleHide(e)
    //console.log('ennuler')
  }

  return (
    <React.StrictMode>
      <Modal
        size="lg"
        show={props.visible}
        onHide={() => props.handleHide()}
        aria-labelledby="example-modal-sizes-title-lg"
        //onEntered={() => props.handleHide()}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg" className='mx-auto'>
            Pour les élu-es, encore plus de saisie 😏 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-4">
          <Form.Group as={Col} md="6" controlId="validationFormikSyndicat">
            <Form.Label>Votre syndicat(*)</Form.Label>
            <Form.Select
              type="text"
              name="syndicat"
              value={props.syndicatValue}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              isInvalid={props.touched.syndicat && props.errors.syndicat}
            >
            {props.syndicat.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
              ))
              }
            </Form.Select>
            {props.touched.syndicat && props.errors.syndicat ? <Form.Control.Feedback type="invalid">{props.errors.syndicat}</Form.Control.Feedback> : null}
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationFormikFonction">
          <Form.Label>votre fonction(*)</Form.Label>
          <Form.Select
            type="text"
            name="fonction"
            placeholder='votre fonction'
            value={props.syndicatFonction}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            isInvalid={props.touched.fonction && props.errors.fonction}
          >
            {props.fonction.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
              ))
            }
          </Form.Select>
          {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
            {props.touched.fonction && props.errors.fonction ? 
                <Form.Control.Feedback type="invalid">{props.errors.fonction}</Form.Control.Feedback> : 
                null
            }
        </Form.Group>
        </Row>
        <Row className="">
          <Form.Group as={Col} md="6" controlId="validationFormikMessageCollegue">
            <Form.Label>votre message aux collègues (facultatif)</Form.Label>
            <Form.Control as="textarea" rows={3} 
              placeholder="Si vous désirez laisser un message de présentation"
              type="text"
              name="message"
              value={props.syndicatMessage}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              //isInvalid={props.touched.message && props.errors.message}
            />
          </Form.Group>
          <Row className="mb-3" as={Col}>
            <Form.Group as={Col} controlId="validationFormikPhoto">
              <Form.Label>Ajouter votre photo (facultatif)</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            
            <Form.Group className="mt-4">
            <Form.Check
            required
            /* name="terms"
            value={values.terms} */
            label="Disponible pour questions(décocher sinon)"
            defaultChecked={true}
            /* onChange={handleChange}
            isInvalid={!!errors.terms}
            feedback={errors.terms}
            feedbackType="invalid"
            id="validationFormikTermsEtConditions" */
            />
            </Form.Group>
          </Row>
        </Row>
        <Modal.Footer>
          <Button
            variant="dark" 
            size="lg"
            className=''
            value='Ennuler modal' 
            onClick={(e) => fermetureModal(e)}
          >
            Ennuler
          </Button>
          <Button
            variant="success" 
            size="lg"
            className='' 
            value='Valider modal'
            onClick={(e) => fermetureModal(e)}
            disabled={
              (props.syndicatValue === '' || props.syndicatValue === 'sélection syndicat') || (props.syndicatFonction === '' || props.syndicatFonction === 'sélection fonction')
              ? true : false}
          >
            Valider
          </Button>
        </Modal.Footer>
        <div className='mx-auto'>* champs obligatoires</div>
      </Modal.Body>
    </Modal>
  </React.StrictMode>
  );
}

export default ModalCreerElu;