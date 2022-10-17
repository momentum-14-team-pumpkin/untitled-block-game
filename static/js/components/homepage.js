import { NavBar } from "./navbar"
import React from "react"
import { Login } from "./login"


export const HomePage =({setAuth, isLoggedIn})=> {
console.log(setAuth)
return(
    <>
    <h1 style={{fontSize:'70px', fontWeight:'600', backgroundImage:'URL(/static/assets/onetile.png)', backgroundSize:'contain', backgroundRepeat:'repeat', color:'transparent', WebkitBackgroundClip:'text', backgroundClip:'text', textAlign:'center'}}
    >Blocks of Time </h1>
    <div style={{display:'flex', justifyContent:'center'}}>
        <header style={{alignItems:'center'}}>
        <Login setAuth={setAuth} isLoggedIn={isLoggedIn}/>
        <NavBar setAuth={setAuth} isLoggedIn={isLoggedIn}/>
        </header>
    </div>
    </>
)

}