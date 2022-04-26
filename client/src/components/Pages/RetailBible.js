import React, { useEffect } from 'react';
import RetailBibleHeader from "../RetailBibleHeader.jsx"
import RetailBibleLiveStockHandle from '../RetailBibleLiveStockHandle.jsx';
import RetailBibleUploads from '../RetailBibleUploads.jsx';
import { useAuth0 } from "@auth0/auth0-react";




function RetailBible() {
  const { user , isAuthenticated } = useAuth0(); 


  


  return (
    <div> 
    <RetailBibleHeader />
    {isAuthenticated && <RetailBibleLiveStockHandle email={user.email} user={user.name}/>}
    <RetailBibleUploads />
    </div>
  );
}

export default RetailBible;