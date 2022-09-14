import React, {useEffect, useState, useRef, useReducer} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AxiosInstance from '../../AxiosInstance';
import Badge from 'react-bootstrap/Badge';
import BasicSelect from '../BasicSelect';
import Form from 'react-bootstrap/Form';

function OrderProduit (){
    const access_token = localStorage.getItem('access_token')
    // Fonction parsseuse de token - besoin de récuperer le id du user -
    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    const options = [
        {
          label: 'Séléctionner le lieu de retrait',
          value: 'Lieu de retrait' 
        },
        {
          label: 'Clinique Bénigne joly',
          value: 'Talant' 
        },
        {
          label: 'SSR Valmy',
          value: 'Valmy' 
        }
      ]
    const [lieuRetrait, setLieuRetrait] = useState(options[0].value)
    const [dateRetrait, setDateRetrait] = useState('')
    const navigate = useNavigate();
    const location = useLocation()
    const initialFormData = {
        produit:'',
        billet_adulte: '',
        billet_enfant: '',
        valeur_totale: '',
        date_retrait: '',
        lieu_retrait: '',
        commanditaire: ''
	};
    //const [formData, updateFormData] = useState(initialFormData);

    const [produit, setProduit] = useState([])
    const [compteurEnfant, enfantDispatch] = useReducer(enfantReducer, 0)
    const [compteurAdulte, adulteDispatch] = useReducer(adulteReducer, 0)
    /* useRef() only returns one item. It returns an Object called current.
        When we initialize useRef we set the initial value: useRef(0).
        It's like doing this: const count = {current: 0}. We can access the count by using count.current. 
    */
    const prix_billet_enfant = useRef(0)
    const prix_billet_adulte = useRef(0)
    const [sommeTotale, setSommeTotale] = useState(0)


    function enfantReducer(state, action){
        switch(action.type){
            case 'increment':
                return state + 1
            case 'decrement':
                if(state > 0) {
                    return state - 1
                }
                return 0
            default:
                throw new Error('hors des clous !')
        }
    }
    function adulteReducer(state, action){
        switch(action.type){
            case 'increment':
                return state + 1
            case 'decrement':
                if(state > 0) {
                    return state - 1
                }
                return 0
            default:
                throw new Error('hors des clous !')
        }
    }
    
    
    useEffect(() => {
        if((localStorage.getItem('access_token') === 'undefined') || (localStorage.getItem('refresh_token') === 'undefined')){
            navigate('/connexion')
        }else{

            if(prix_billet_adulte.current === 0){
                
                AxiosInstance
                    .get(`produits/${location.state.nom}`)//location.state.nom : lancer par la page précédente en param 2 de useNavigate
                    .then((res) => {
                        setProduit(res.data)
                        prix_billet_adulte.current = res.data.prix_adulte
                        prix_billet_enfant.current = res.data.prix_enfant
                        //console.log(res.data);
                    })
                    .catch(function (error) {
                        if (error.response) {
                            // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        } else if (error.request) {
                            // The request was made but no response was received
                            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                            // http.ClientRequest in node.js
                            console.log(error.request);
                        } else {
                            // Something happened in setting up the request that triggered an
                            //console.log('Erreur', error.message);
                        }
                        //console.log(error.config);
                    });
            }
        }
        let st = (prix_billet_adulte.current * compteurAdulte) + (prix_billet_enfant.current * compteurEnfant)
        // Ternaire
        st.toString().includes('.') ? setSommeTotale(st.toString().replace('.', ',')) : setSommeTotale(st)
        
    }, [compteurAdulte, compteurEnfant])


    function _handleSubmit(e){
        e.preventDefault();
        initialFormData.produit = location.state.id
        initialFormData.billet_enfant = compteurEnfant
        initialFormData.billet_adulte = compteurAdulte
        initialFormData.valeur_totale = sommeTotale
        initialFormData.lieu_retrait = lieuRetrait
        initialFormData.date_retrait = dateRetrait
        initialFormData.commanditaire = parseJwt(access_token).user_id

        console.log(initialFormData)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        initialFormData.produit = location.state.id
        initialFormData.billet_enfant = compteurEnfant
        initialFormData.billet_adulte = compteurAdulte
        initialFormData.valeur_totale = sommeTotale
        initialFormData.lieu_retrait = lieuRetrait
        initialFormData.date_retrait = dateRetrait
        initialFormData.commanditaire = parseJwt(access_token).user_id
		AxiosInstance
			.post(`commandes/`, {
				produit: location.state.id,
                billet_adulte: compteurAdulte,
                billet_enfant: compteurEnfant,
                valeur_totale: parseFloat(sommeTotale),
                date_retrait: dateRetrait,
                lieu_retrait: lieuRetrait,
                commanditaire: parseJwt(access_token).user_id
			})
			.then((res) => {
                navigate('/');//Vers accueil
                
				console.log(res);
			})
            .catch(function (error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  //console.log('Erreur', error.message);
                }
                console.log(error.config);
              });
    }

    return ( 
        <React.StrictMode>
        <Form>
            <div className="container-fluid entete-div_commande_produit justify-content-center row">
                <div className="justify-content-center d-flex">
                    <img className="m-1 col-md-1" src={produit.photo} alt='img produit' />
                    <h1 className='col-md-6'>Billets {produit.nom}</h1>
                    <h2>
                        Total <Badge bg="secondary">{sommeTotale} €</Badge>
                    </h2>
                </div>
                <div className="les-compteurs row mb-3 ">
                    <div className="counter compteur-enfant mb-3 col-md-6">
                        <p className='nb-billet m-2'>Billet(s) enfant  </p>
                        <button 
                            type='button' 
                            className="counter--minus" 
                            onClick={() => enfantDispatch({type: 'decrement'})}
                        >–</button>
                        <div className="counter--count">
                            <h3>{compteurEnfant}</h3>
                        </div>
                        <button 
                            type='button' 
                            className="counter--plus" 
                            onClick={() => enfantDispatch({type: 'increment'})}
                        >+</button>
                    </div>
                    <div className="counter compteur-adulte col-md-6">
                        <p className='nb-billet'>Billet(s) adulte </p>
                        <button 
                            type='button' 
                            className="counter--minus" 
                            onClick={() => adulteDispatch({type: 'decrement'})}
                        >–</button>
                        <div className="counter--count">
                            <h1>{compteurAdulte}</h1>
                        </div>
                        <button 
                            type='button' 
                            className="counter--plus" 
                            onClick={() => adulteDispatch({type: 'increment'})}
                        >+</button>
                    </div>
                </div>
                 <div className="paramCommande row mb-3 ">
                    <div className="counter col-md-6 p-2 mb-3">
                        <p className='lieu-retrait m-2 '>
                            Retrait
                        </p>
                        <div className="div-select-lieu m-2">
                        <Form.Select 
                            value={lieuRetrait}
                            onChange={(e) => setLieuRetrait(e.target.value)}
                            >
                            {options.map((option) => (
                                    <option key={option.label} value={option.value}>{option.label}</option>
                                ))
                            }
                        </Form.Select>
                        </div>
                    </div>
                    <div className="counter col-md-6  p-2">
                        <p className='lieu-retrait m-2 '>
                            Date retrait
                        </p>
                        <div className="div-select-lieu m-2">
                        <Form.Control
                            type="date"
                            name="date-retrait"
                            placeholder="Due date"
                            value={dateRetrait}
                            onChange={(e) => setDateRetrait(e.target.value)}
                        />
                        </div>
                    </div>
                    
                </div>
                <div className="justify-content-center d-flex">
                <button 
                    className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" 
                    type="submit"
                    onClick={handleSubmit}
                >Confirmer
                </button>
                </div>
            </div>
            
        </Form>
        </React.StrictMode>
    )
}
export default OrderProduit