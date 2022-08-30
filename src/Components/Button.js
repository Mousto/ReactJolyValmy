import React from 'react'
import { Link } from 'react-router-dom'
import './../styles/components/_bouton.scss'

function Bouton(props){
    return (
        <Link to={props.to} >
            <button className="btn">{props.designation}</button>
        </Link>
    )
}
export default Bouton