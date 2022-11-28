import React from 'react'
import { Link } from 'react-router-dom'
import './../styles/components/_bouton.scss'

function Bouton(props){
    return (
        <button className="btn">{props.action}</button>
    )
}
export default Bouton