import React from 'react'
import Tilt from 'react-tilt';
import brain_logo from './logo.png'
import './Logo.css'

const Logo = () =>{
    return (
        <div className = "ma4 mt0">
            <Tilt className="Tilt shadow-2 logo-dsg" options={{ max : 50 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner tc pa3"> 
                    <img style={{paddingTop: '5px'}} alt='logo'  src = {brain_logo}/>
                 </div>
            </Tilt>
        </div>
    )
}

export default Logo;