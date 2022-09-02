import React from 'react'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function Message(props){
    //console.log(props.navigate.pathname)

    const [show, setShow] = React.useState(true);
    
    const toggleShow = () => {
        setShow(!show)
    }

    return (
        <React.StrictMode>
            <ToastContainer className="p-3" position='middle-center'>
                <Toast
                    className="d-inline-block m-1"
                    bg={props.variant}
                    animation={true}
                    show={show} 
                    onClose={toggleShow} 
                >
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt="img"
                    />
                    <strong className="me-auto">{props.titre}</strong>
                </Toast.Header>
                <Toast.Body className={props.variant === 'Dark' && 'text-white'}>
                    {props.message}
                </Toast.Body>
                </Toast>
            </ToastContainer>
        </React.StrictMode>
    )
}
export default Message