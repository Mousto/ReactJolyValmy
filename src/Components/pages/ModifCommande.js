import React, {useEffect, useState, useRef} from 'react';
import {useLocation, useNavigate } from 'react-router-dom';
import NumericInput from 'react-numeric-input';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import AxiosInstance from '../../AxiosInstance';

function ModifCommande(){
    
    //Style du NumericInput possible de le faire aussi dans le composant(voir le code commenté dans le NumericInput ci-dessous)
    NumericInput.style.input.color = 'red';
    
    const navigate = useNavigate();
    const location = useLocation()
    const [lieuRetrait, setLieuRetrait] = useState(location.state.lieu_retrait)
    const [dateRetrait, setDateRetrait] = useState(location.state.date_retrait)
    const [sommeTotale, setSommeTotale] = useState(location.state.valeur_totale)
    const [billetAdulte, setBilletAdulte] = useState(location.state.billet_adulte)
    const [billetEnfant, setBilletEnfant] = useState(location.state.billet_enfant)

    const prix_enfant = useRef(location.state.produit.prix_enfant)
    const prix_adulte = useRef(location.state.produit.prix_adulte)

    //console.log(prix_adulte)

    function handleChange(event) {
        setLieuRetrait(event.target.value);
        console.log('lieu retrait '+lieuRetrait);
    }

    function handleSubmit(event) {
        event.preventDefault();

        async function modifCommande(){
            try{const res = await AxiosInstance
                .put(`commandes/${location.state.id}/`, {
                    billet_adulte: billetAdulte,
                    billet_enfant: billetEnfant,
                    valeur_totale: parseFloat(sommeTotale.replace(',', '.')),
                    date_retrait: dateRetrait,
                    lieu_retrait: lieuRetrait,
                });
                //navigate('/');//Vers accueil
                alert('Tes changements ont bien été prisen compte')
                navigate(-1);//Vers la page précédente
                //console.log(res);
            }catch(error){
                console.log(error)
            }
           
        }
        modifCommande();
    }

    function updateBilletEn(val){
        setBilletEnfant(val)
    }
    function updateBilletAd(val){
        setBilletAdulte(val)
    }

    useEffect(() => {
        let total = (prix_adulte.current * billetAdulte) + (prix_enfant.current * billetEnfant)
        total = total.toString()
        if(total.includes('.')){
            total = total.replace('.', ',')
        }
        setSommeTotale(total) 
    },[sommeTotale, billetAdulte, billetEnfant])

    return(
        <Form onSubmit={handleSubmit}>
            <div className="container-fluid">
                <h1>Modification de commande</h1>
                <h2>{location.state.produit.nom}</h2>
                {/* {console.log(location.state)} */}
                <div className="billet-enfant mb-2">
                    <label className='mr-2'>
                    Nombre de billet enfant
                    <NumericInput 
                        min={0} 
                        max={100} 
                        value={billetEnfant} 
                        onChange={(value) => updateBilletEn(value)} 
                        size={ 3 } 
                        mobile 
                        /* style={{
                            input: {
                                color: 'red'
                            }
                        }} */
                    /> ({prix_enfant.current}€/billet)
                    </label>
                </div>
                <div className="billet-adulte mb-2">
                    <label className='mr-2'>
                    Nombre de billet adulte
                    <NumericInput 
                        min={0} 
                        max={100} 
                        value={billetAdulte}
                        onChange={(value) => updateBilletAd(value)} 
                        size={ 3 } 
                        mobile
                    /> ({prix_adulte.current}€/billet)
                    </label>
                </div>
                <div className="mb-2">
                    <label>Somme totale
                    <h3>
                        <Badge bg="secondary">{ sommeTotale } €</Badge>
                    </h3>
                    </label>
                </div>
                <div className="lieu-retrait mb-2">
                    <label>lieu de retrait
                    <select value={lieuRetrait} onChange={handleChange}>
                        <option value="Talant">Talant</option>
                        <option value="Valmy">Valmy</option>
                    </select>
                    </label>
                </div>
                <div className="date-retrait mb-2">
                    <label>Date de retrait
                    <Form.Control
                        type="date"
                        name="date-retrait"
                        placeholder="Due date"
                        value={dateRetrait}
                        onChange={(e) => setDateRetrait(e.target.value)}
                    />
                    </label>
                </div>
                <div className="btn-submit">
                    <Button variant="info" onClick={handleSubmit} type='submit'>Confirmer modifications</Button>
                </div>
            </div>
            
        </Form>
    )
}
export default ModifCommande