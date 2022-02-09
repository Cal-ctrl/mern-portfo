import React from 'react';
import RetailBibleHeader from "../RetailBibleHeader.jsx"
import RetailBibleLiveStockHandle from '../RetailBibleLiveStockHandle.jsx';
import RetailBibleUploads from '../RetailBibleUploads.jsx';
import { useAuth0 } from "@auth0/auth0-react";




function RetailBible() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  return (
    <div> 
    <RetailBibleHeader />
    {isAuthenticated && <RetailBibleLiveStockHandle />}
    <RetailBibleUploads />
    </div>
  );
}

export default RetailBible;