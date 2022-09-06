import React from 'react'

function PostLoading(Produit) {
    return function PostLoadingComponent({ isLoading, props}) {
        if(!isLoading && props != null) return props.map((produit) => (
            <Produit key={produit.id} {...produit} />)
            )
        return (
            <h1>Recherche des données en cours ! :)</h1>
        )
    }
}
export default PostLoading