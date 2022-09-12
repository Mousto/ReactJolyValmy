import Form from 'react-bootstrap/Form';

function BasicSelect(props) {
  return (
    <Form.Select size={props.taille} aria-label="Default select example">
      <option>Lieu...</option>
      <option value="1">Talant</option>
      <option value="2">Valmy</option>
    </Form.Select>
  );
}

export default BasicSelect;