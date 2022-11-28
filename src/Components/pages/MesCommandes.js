import React, {useEffect, useState} from 'react';
import CarteCommande from '../CarteCommande';
import AxiosInstance from '../../AxiosInstance';
import Button from 'react-bootstrap/Button';

function MesCommandes (){

  const [commandes, setCommandes] = useState([]) 
  const [etatCommande, setEtatCommande] = useState('commande active')

  useEffect(() =>{
    //console.log(commandes.length)
    if(commandes.length === 0){
        AxiosInstance
          .get(`commandes/`)
          .then((res) => {
              //console.log(res.data);
              setCommandes(res.data)
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
              console.log('Error', error.message);
            }
            console.log(error.config);
          });
      }
  }, [commandes, etatCommande])
    
  //SUPPRESSION DE COMMANDE
  function suppCommande(idElement){
    console.log('Je supprime la commande '+idElement+' à partir du composant mère')
    // DELETE request using axios with async/await
    async function deleteCommande(idElement) {
      await AxiosInstance.delete(`commandes/${idElement}/`, {'id': 4});
      setCommandes([]);
    }
    deleteCommande(idElement);
  }
  //VERS CREATION NOUVELLE COMMANDE
  const newCommande = () => {
    alert('nouvelle commande')
  }
  return(
      <React.StrictMode>
          <div className="container-fluid">
            {commandes.length !== 0 &&
                <div className="d-flex justify-content-around">
                <h1>Mes commandes</h1>
                <div className="mt-2">
                  <Button variant="info" onClick={newCommande}>Nouvelle commande</Button>
                </div>
              </div>}
            {commandes.length !== 0 ?
              <div className="lesCarteCommande d-flex justify-content-around"> 
              {
                commandes.map((commande) => {
                  return(
                    <CarteCommande key={commande.id} maCommande={commande} handelClick={() => suppCommande(commande.id)}/>
                  )
                } )
                
              }
              </div> :
                <h1>Vous n'avez aucune commande en cours</h1>
            }
          </div>
      </React.StrictMode>
    )
}
export default MesCommandes