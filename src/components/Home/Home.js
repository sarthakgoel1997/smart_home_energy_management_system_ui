import React, {useState, useEffect} from "react";
import logo from '../../icons/con_edison_logo.png';
import {Button} from 'reactstrap';
import './Home.css';
import { Link } from 'react-router-dom';


function isAuthTokenExpired () {
    const expirationTime = localStorage.getItem('expirationTime');

    if (!expirationTime) {
        // Token expiration information is not available
        return true;
    }

    return new Date().getTime() > parseInt(expirationTime, 10);
};

function Home() {
    const [authTokenExpired, setAuthTokenExpired] = useState(isAuthTokenExpired);
    useEffect(() => {
      const handleStorageChange = () => {
        setAuthTokenExpired(isAuthTokenExpired());
      };
  
      window.addEventListener('storage', handleStorageChange);
  
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }, []);

    return (
        <div>
            <div className='background-logo'>
                <img src={logo} alt="logo"/>
            </div>

            <div className="slogan-container">
                <h1 className="slogan">Providing electric, gas, and steam to NYC and Westchester. Pay your bill, manage your account, report an outage, and learn how to save energy.</h1>
                <Link to={authTokenExpired ? '/policy' : '/dashboard'}><Button>Get Started</Button></Link>
            </div> 
        </div>
    );
};

export default Home;