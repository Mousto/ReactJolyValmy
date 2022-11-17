import Card from 'react-bootstrap/Card';

function CarteCommande(props) {
  return (
    <div className="lesCommandes d-flex">
        {   props.mesCommandes.map( (commande) =>{
            console.log(commande);
            return(
            <Card key={commande.id} style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title><h2>Billets {commande.produit.nom}</h2></Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"><h3>Détail commande</h3></Card.Subtitle>
                    <Card.Text>
                        <p>
                            Commande en date du : {commande.date}
                        </p>
                        <p>
                            {commande.billet_enfant} billet-enfant ({commande.billet_enfant} x {commande.produit.prix_enfant} euros) = {commande.billet_enfant * commande.produit.prix_enfant} € 
                        </p>
                        <p>
                            {commande.billet_adulte} billet-adulte ({commande.billet_adulte} x {commande.produit.prix_adulte} euros) = {commande.billet_adulte * commande.produit.prix_adulte} € 
                        </p>
                        <p>
                            Somme totale : {commande.valeur_totale} euros
                        </p>
                        <p>
                            Lieu de retrait : {commande.lieu_retrait}
                        </p>
                        <p>
                            Date de retrait : {commande.date_retrait}
                        </p>
                        
                    </Card.Text>
                    <Card.Link href="#">Supprimer</Card.Link>
                    <Card.Link href="#">Modifier</Card.Link>
                </Card.Body>
            </Card>)
        }

        )
        }
    </div>
  );
  
}

export default CarteCommande;