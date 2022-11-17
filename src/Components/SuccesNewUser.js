import React from 'react';
import MonConfetti from './Confetti';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function SuccesNewUser (){
    const navigate = useNavigate();
    return(
        <React.StrictMode>
        <MonConfetti />
        <div className='div-welcome'>
            <Button 
                className="m-2" 
                size="lg" 
                variant="primary" 
                type="button"
                onClick={() => navigate('/')}
            >Retour à l'accueil 😏</Button> 
        </div >
        </React.StrictMode>
    )
}
export default SuccesNewUser