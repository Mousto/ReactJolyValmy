import Form from 'react-bootstrap/Form';

function BasicSelect(props) {

    const options = [
      {
        label: 'Lieu...',
        value: 'lieu' 
      },
      {
        label: 'Talant',
        value: 'talant' 
      },
      {
        label: 'Valmy',
        value: 'valmy' 
      }
    ]

  return (
    <Form.Select 
      value="lieu" 
      size={props.taille} 
      aria-label="Default select example"
    >
      {options.map((option) => (
              <option value={option.value}>{option.label}</option>
        ))
      }
    </Form.Select>
  );
}

export default BasicSelect;