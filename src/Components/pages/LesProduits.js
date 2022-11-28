import React, { useEffect, useState } from "react"
import CarteProduit from "../CarteProduit";
import axios from 'axios';
import PostLoadingComponent from "../ProduitLoading";

function LesProduits(){

  const ProduitLoading = PostLoadingComponent(CarteProduit);
  const [appState, setAppState] = useState({
    loading: false,
    produits: null,
  });

  useEffect(() =>{
    setAppState({ loading: true });

    axios.get(`http://127.0.0.1:8000/api/produits`)
      .then(res => {setAppState({ loading: false, produits: res.data})})
      
  },[setAppState])
  //console.log(appState.produits);
    
    return(
      <main>
        <div className="div-lesProduits">
            <ProduitLoading isLoading={appState.loading} props={appState.produits}  />
        </div>
      </main>
    )
}
export default LesProduits