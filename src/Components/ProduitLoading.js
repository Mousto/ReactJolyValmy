import React from 'react'

function PostLoading(Produit) {
    return function PostLoadingComponent({ isLoading, props}) {
        //console.log(props);
        if(!isLoading && (props != null || props != undefined)){ 
            return props.results.map(produit => (
            <Produit key={produit.id} {...produit} />)
            )
        }
        return (
            <h1>Recherche des données en cours ! :)</h1>
        )
    }
}
export default PostLoading