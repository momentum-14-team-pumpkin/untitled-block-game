import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "/static/css/title.css"

export const Title = () => {
    const location = useLocation()

    if (location.pathname === '/flags/') {
        return <></>
    }

    return(
        <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
        <Link to='/' style={{textDecoration:'none'}}>
        <h1 style={{fontFamily:'Bungee', textTransform:'uppercase', fontSize:'5rem', fontWeight:'600',  color:'white', marginTop:'2rem'}}
        >
        {location.pathname === '/' ? 
        <>
            Blocks of&nbsp;
            <div id="flip">
            <div><div className='trebuchet' >Time</div></div>
            <div><div className="bungee">Time</div></div>
            <div><div className="gill-sans">Time</div></div>
            <div><div className='trebuchet' >Time</div></div>
            </div>
        </> : 
        'Blocks of Time'}
            </h1></Link>
        </div>
    )
}
