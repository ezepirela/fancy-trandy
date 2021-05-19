import React, { useState, useEffect, useContext} from 'react';
import { UserContext } from '../context/ContextProvider';
import io from 'socket.io-client';
import {useHistory} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
// const API_URL = 'http://127.0.0.1:4000';
// const socket = io(API_URL);
const socket = io(process.env.REACT_APP_BACKEND_URL);

const Prueba2 = () => {
    const history = useHistory();
    const auth = useContext(UserContext);
    const [disabled, setDisabled] = useState('');
    let popup = window;
    const checkPopup = () => {
        const check = setInterval(() => {
            if(!popup || popup.closed || popup.closed === undefined) {
                clearInterval(check);
                setDisabled('')
            }
        }, 1000)
    }
    const openPopup = () => {
        const width = 600, height = 600;
        const left  = (window.innerWidth /2 ) - (width / 2);
        const top   = (window.innerHeight / 2) - (height / 2);
        const url = `${process.env.REACT_APP_BACKEND_URL}login/inicioGoogle?socketId=${socket.id}`;
        return window.open(url, '',       
            `toolbar=no, location=no, directories=no, status=no, menubar=no, 
            scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
            height=${height}, top=${top}, left=${left}`
        )  
    }
    const startAuth = () => {
        if(!disabled) {
            popup = openPopup();
            checkPopup();
            setDisabled('disabled');
        }
    }
    useEffect( () => {
        socket.on('user', user =>{
            popup.close();
            auth.login(user.user._id, user.token, user.user.username, user.user.firstName, user.user.lastName);
            history.push('/home');
        }, [popup]);
    })
    return (
        <div className='googleLogin__loginButton'>
        <Button onClick={startAuth}>
            <span>Google <FontAwesomeIcon icon={faGoogle} /> </span> 
        </Button> 
      </div>
    )
}
export default Prueba2;
    