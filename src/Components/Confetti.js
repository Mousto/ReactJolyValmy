import React, {useEffect, useState} from 'react';
import ReactConfetti from 'react-confetti'

function Confetti(){
    const [windowDimension, setDimension] = useState({width: window.innerWidth, height : window.innerHeight});
    
    const detectSise = () => {
        setDimension({width: window.innerWidth, height : window.innerHeight})
    }

    useEffect(() => {
        window.addEventListener('resize', detectSise);
        return () =>{
            window.removeEventListener('resize', detectSise)
        }
    }, [windowDimension])

    return(
        <div className="">
            <ReactConfetti
                width={windowDimension.width}
                height={windowDimension.height}
                tweenDuration={10}
            />
        </div>
    )
}
export default Confetti