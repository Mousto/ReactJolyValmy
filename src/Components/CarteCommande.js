import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ModifCommande from './pages/ModifCommande';
import { useNavigate} from 'react-router-dom';


function CarteCommande(props) {
    
    const navigate = useNavigate();
    
    const ModifCommande = () =>{
        // En 2ième param un objet transportant des données pour la page indiquée en param 1 et la récupération se fait à l'aide de useLocation.
            /* navigate('/order-produit', {state:{nom: props.nom,
                                         id: props.id}}) */
        navigate('../modification-commande', {state:props.maCommande})
    }

     useEffect(() => {
        //console.log('Dans useEffect de carteCommande.js')
        //setCommandes(commandes)
    }, []); 

    return (
        <div className="lesCommandes d-flex">
            {/* {   commandes.map( (commande) =>{ */}
                {/* return( */}
                
                <Card key={props.maCommande.id} style={{ width: '18rem' }} className="m-3">
                    <Card.Body>
                        <Card.Title><h2>{props.maCommande.produit.nom}</h2></Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Détail de la commande</Card.Subtitle>
                        <Card.Text>
                            <p>
                                Date de commande : {props.maCommande.date}
                            </p>
                            <p>
                                {props.maCommande.billet_enfant} billet-enfant ({props.maCommande.billet_enfant} x {props.maCommande.produit.prix_enfant} euros) = {props.maCommande.billet_enfant * props.maCommande.produit.prix_enfant} € 
                            </p>
                            <p>
                                {props.maCommande.billet_adulte} billet-adulte ({props.maCommande.billet_adulte} x {props.maCommande.produit.prix_adulte} euros) = {props.maCommande.billet_adulte * props.maCommande.produit.prix_adulte} € 
                            </p>
                            <p>
                                Somme totale : {props.maCommande.valeur_totale} euros
                            </p>
                            <p>
                                Lieu de retrait : {props.maCommande.lieu_retrait}
                            </p>
                            <p>
                                Date de retrait : {props.maCommande.date_retrait}
                            </p>
                            
                        </Card.Text>
                        <div className="btn-gestionCommande d-flex justify-content-around">
                            <Button variant="danger" onClick={() => props.handelClick(props.maCommande.id)}>Supprimer</Button>
                            <Button variant="primary" onClick={ModifCommande}>Modifier</Button>
                        </div>
                        {/* <Card.Link href="#">Supprimer</Card.Link>
                        <Card.Link href="#">Modifier</Card.Link> */}
                    </Card.Body>
                </Card>
                {/* ) */}
            {/* }

            )
            } */}
        </div>
    );
  
}

export default CarteCommande;