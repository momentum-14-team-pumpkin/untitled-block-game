import React from "react"
import "/static/css/index.css"
import {Link} from 'react-router-dom'



export const LoginOrShowUser =({isLoggedIn, currUsername, token, setAuth, handleLogout}) => {


    if (!isLoggedIn) {
    return(
        <>
        <div>
            <div style={{textAlign:'center', marginTop:'20px'}}>
                <Link to={"/login/"} element =''style={{color:'white', fontFamily:'bungee', paddingRight:'30px'}}
                >Login</Link>
                <Link to='/playgame/'
                style={{color:'white', fontFamily:'bungee', borderRadius:'10px'}}
                >Play Game</Link>
            </div>
        </div>  
        <div style={{ display:'flex', justifyContent:'center', color:'white', paddingTop:'20px', fontFamily:'bungee', marginBottom:'20px'}} >
            Don't have a login?<Link to="/register" style={{ color:'white', paddingRight:'30px', paddingLeft:'10px'}} >  Register Here</Link>
        </div>
        </>)
    }

    else {
        return(
            <>
            <div style={{textAlign:'center', marginTop:'50px', marginBottom:'30px'}}>
                <div >
                    <p style={{color:'white', fontFamily:'bungee', fontSize:'1.5rem'}}>Ready to play </p>
                    <p style={{color:'white', fontFamily:'bungee', fontSize:'1.5rem'}} >{currUsername}</p>
                </div>
                <div>
                    <Link to='/playgame/'
                    style={{color:'white', fontFamily:'bungee', borderRadius:'10px'}}
                    >Play Game</Link>
                </div>
                <div>
                    <Link to="/">
                    <button onClick={handleLogout} style={{borderRadius:'10px', color:'black', fontWeight:'bolder', fontFamily:'bungee', background:'#f0f0f0', marginTop:'20px'}}>
                    Logout</button></Link>
                </div>
            </div>
            </>
        )
    }
}