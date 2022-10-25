import React from "react";
import { Link } from "react-router-dom";

export const Title =() => {
    return(
        <div>
        <Link to='/' style={{textDecoration:'none'}}>
        <h1 style={{fontFamily:'Bungee', height:'5rem', textTransform:'uppercase', fontSize:'4.9rem', fontWeight:'600',  color:'white', textAlign:'center', marginTop:'4rem'}}
        >
            Blocks of&nbsp;
            <div id="flip">
            <div><div className='trebuchet' >Time</div></div>
            <div><div className="bungee">Time</div></div>
            <div><div className="gill-sans">Time</div></div>
            <div><div className='trebuchet' >Time</div></div>
            </div>

            </h1></Link>
        </div>



    )
}