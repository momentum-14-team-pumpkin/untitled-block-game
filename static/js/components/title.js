import React from "react";
import { Link } from "react-router-dom";

export const Title =() => {
    return(
        <div>
        <Link to='/' style={{textDecoration:'none'}}>
        <h1 style={{fontFamily:'Bungee', textTransform:'uppercase', fontSize:'84px', fontWeight:'600',  color:'white', textAlign:'center', marginTop:'0', paddingTop:'4rem'}}
        >
            Blocks of 
            <div id="flip">
            <div><div>Time</div></div>
            <div><div>Time</div></div>
            <div><div>Time</div></div>
            </div>
            </h1></Link>
        </div>



    )
}