import { NavBar } from "./navbar"
import React from "react"
import { Login } from "./login"
import "/static/css/index.css"



export const HomePage =({setAuth, isLoggedIn, handleLogout, currUsername, token})=> {
return(
    <>
    <div>
        <h1 style={{fontFamily:'Bungee', textTransform:'uppercase', fontSize:'84px', fontWeight:'600',  color:'white', textAlign:'center', marginTop:'0', paddingTop:'4rem'}}
        >Blocks of Time </h1>
        <div style={{display:'flex', justifyContent:'center'}}>
            <header style={{alignItems:'center'}}>
            <Login currUsername={currUsername} setAuth={setAuth} isLoggedIn={isLoggedIn} handleLogout={handleLogout} token={token}/>
            <NavBar setAuth={setAuth} isLoggedIn={isLoggedIn}/>
            </header>
        </div>
        </div>
    </>
)

}
