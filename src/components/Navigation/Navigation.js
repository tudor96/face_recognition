import React from 'react';
import './Navigation.css'

const Navigation = ({onRouteChange,isSignedIn}) => {
   
    if(isSignedIn){
        return(
            <div className = "ma4 mt0">        
                 <p onClick = {() =>onRouteChange('signout')} className = 'f4 link dim white pa3 pointer button-sign'> Sign Out </p>
            </div>
        )
    }else {
        return(
     
            <div className = "ma4 mt0">        
                 <p onClick = {() =>onRouteChange('signin')} className = 'f4 link dim white pa3 pointer button-sign'> Sign In </p>
      
                  <p onClick = {() =>onRouteChange('register')} className = 'f4 link dim white pa3 pointer button-sign'> Register  </p>
            </div>
        
        )
    }
    
}

export default Navigation;