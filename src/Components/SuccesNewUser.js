import React from 'react';
import MonConfetti from './Confetti';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function SuccesNewUser (){

    return(
        <React.StrictMode>
        {/* <MonConfetti /> */}
        <div className='div-welcome d-flex flex-column justify-content-around mb-5'>
            <Button className="m-2" size="lg" variant="primary" type="button">Vers l'accueil 😏</Button> 
        </div >
        </React.StrictMode>
    )
}
export default SuccesNewUser