import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Auth0Provider } from "@auth0/auth0-react";
import dotenv from "dotenv"
dotenv.config()


ReactDOM.render(
  <Auth0Provider
  domain="dev-yzf7krro.us.auth0.com"
  clientId="6LZXpcorftiFzbVqc3NCuYIbzLaFzdAg"
  redirectUri={window.location.origin}
  audience='https://portfo-api-users'>

    <App />
    
    </Auth0Provider>,
  document.getElementById('root')
);