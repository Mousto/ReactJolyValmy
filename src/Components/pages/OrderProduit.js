import React, {useEffect, useState, useRef, useReducer} from 'react';
import AxiosInstance from '../../AxiosInstance';
import Badge from 'react-bootstrap/Badge';
import BasicSelect from '../BasicSelect';

function OrderProduit (){
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
        AxiosInstance
            .get(`produits/Bowling`)
            .then((res) => {
                setProduit(res.data)
                prix_billet_adulte.current = res.data.prix_adulte
                prix_billet_enfant.current = res.data.prix_enfant
                let st = (prix_billet_adulte.current * compteurAdulte) + (prix_billet_enfant.current * compteurEnfant)
                setSommeTotale(st)
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
    }, [compteurAdulte, compteurEnfant])


    return ( 
        <React.StrictMode>
            <div className="container-fluid entete-div_commande_produit d-flex justify-content-center row">
                <div className="justify-content-center d-flex">
                    <img className="m-1 col-md-1" src={produit.photo} alt='img produit' />
                    <h1 className='col-md-6'>Billets {produit.nom}</h1>
                    <h1>
                        Total <Badge bg="secondary">{sommeTotale} €</Badge>
                    </h1>
                </div>
                <div className="les-compteurs row mb-3">
                    <div className="counter compteur-enfant mb-3 col-md-6">
                        <p className='nb-billet m-2'>Billet(s) enfant  </p>
                        <button className="counter--minus" onClick={() => enfantDispatch({type: 'decrement'})}>–</button>
                        <div className="counter--count">
                            <h1>{compteurEnfant}</h1>
                        </div>
                        <button className="counter--plus" onClick={() => enfantDispatch({type: 'increment'})}>+</button>
                    </div>
                    <div className="counter compteur-adulte col-md-6">
                        <p className='nb-billet'>Billet(s) adulte </p>
                        <button className="counter--minus" onClick={() => adulteDispatch({type: 'decrement'})}>–</button>
                        <div className="counter--count">
                            <h1>{compteurAdulte}</h1>
                        </div>
                        <button className="counter--plus" onClick={() => adulteDispatch({type: 'increment'})}>+</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 paramCommande d-flex">
                        <p className='lieu-retrait '>
                            Lieu de retrait 
                        </p>
                    </div>
                    <div className="div-select-lieu">
                        <BasicSelect />
                    </div>
                </div>
            </div>
            
        </React.StrictMode>
    )
}
export default OrderProduit