import React, { useEffect, useState } from "react"
import Produit from "./Produit";
import axios from 'axios';

import PostLoadingComponent from "./PostLoading";

function LesProduits(){

  const PostLoading = PostLoadingComponent(Produit);
  const [appState, setAppState] = useState({
    loading: false,
    produits: null,
  });

  useEffect(() =>{
    setAppState({ loading: true });

    axios.get(`http://127.0.0.1:8000/api/produits`)
      .then(res => setAppState({ loading: false, produits: res.data}))
      
    },[setAppState])
    
    return(
      <main>
        <div className="div-lesProduits">
            <PostLoading isLoading={appState.loading} props={appState.produits}  />
        </div>
      </main>
    )
}
export default LesProduits