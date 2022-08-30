import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

function Carte(props){
    return (
        <React.StrictMode>
            <Card className='mt-5' style={{ width: '15rem' }}>
                <div className="produit-dispo">
                    {props.disponible === false && <div className="card--badge">Bientôt disponible</div>}
                </div>
                <Card.Img variant="top" src={props.photo} />
                <Card.Body>
                    <Card.Title>{props.nom}</Card.Title>
                    <Card.Text>
                        <span className="prix-enfant"> Prix enfant : {props.prix_enfant}</span><br/>
                        <span className="prix-adulte"> Prix Adulte : {props.prix_adulte}</span>
                    </Card.Text>
                    <Button disabled={!props.disponible} variant="primary">Commander</Button>
                </Card.Body>
            </Card>
        </React.StrictMode>
    )
}
export default Carte