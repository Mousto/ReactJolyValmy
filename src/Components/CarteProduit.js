import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

function CarteProduit(props){
    //Pour la navigation
    const navigate = useNavigate();
    const commandeProduit = () =>{
        if((localStorage.getItem('access_token') === undefined) || (localStorage.getItem('refresh_token') === undefined) || !localStorage.getItem('access_token') || !localStorage.getItem('refresh_token')){
            navigate('/connexion')
        }
        else{
            // En 2ième param un objet transportant des données pour la page indiquée en param 1 et la récupération se fait à l'aide de useLocation.
            navigate('/order-produit', {state:{nom: props.nom,
                                         id: props.id}})
        }
    }          

    return (
        <React.StrictMode>
            <Card className='mt-5' style={{ width: '12rem' }}>
                <div className="produit-dispo">
                    {props.disponible === false && <div className="card--badge">Bientôt disponible</div>}
                </div>
                <Card.Img variant="top" src={props.photo} />
                <Card.Body>
                    <Card.Title>{props.nom}</Card.Title>
                    <Card.Text>
                        <span className="prix-enfant"> Prix enfant : {props.prix_enfant} €</span><br/>
                        <span className="prix-adulte"> Prix Adulte : {props.prix_adulte} €</span>
                    </Card.Text>
                    <Button disabled={!props.disponible} variant="primary" onClick={commandeProduit}>Commander</Button>
                </Card.Body>
            </Card>
        </React.StrictMode>
    )
}
export default CarteProduit