import React from 'react'

function PostLoading(Component) {
    return function PostLoadingComponent({ isLoading, props}) {
        if(!isLoading && props != null) return props.map((produit) => (
            <Component key={produit.id} {...produit} />)
            )
        return (
            <h1>Chargement des données en cours !...</h1>
        )
    }
}
export default PostLoading