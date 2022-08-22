import React from 'react';

function Produit(props){
    return(
        <div className="produit-card">
            {/* introduire la valeur prop équivalente dans l'url. À revoir dans le cours scrimba: AirBnb-clone/Project: pass props to card component 
                <img src={`../images/${props.img}`} className="card--image" />
            */}
            {props.disponible === false && <div className="card--badge">Bientôt disponible</div>}
            <img src={props.photo} alt="visuel du produit" className="produit--image"/>
            <p className="nom--produit">{props.nom}</p>
            <div className="info-group">
                <p>Prix enfant : {props.prix_enfant} €</p>
            </div>
            <div className="info-group">
                <p>Prix adulte : {props.prix_adulte} €</p>
            </div>
            <div className="info-group">
                <button>Commander</button>
            </div>
        </div>
    )
}
export default Produit;