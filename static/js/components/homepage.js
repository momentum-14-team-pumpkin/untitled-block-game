import { NavBar } from "./navbar"
import React from "react"
import { Login } from "./login"
import "/static/css/index.css"


export const HomePage =({setAuth, isLoggedIn})=> {
console.log(setAuth)
return(
    <>
    <div>
        <h1 style={{fontFamily:'Bungee', textTransform:'uppercase', fontSize:'84px', fontWeight:'600',  color:'white', textAlign:'center'}}
        >Blocks of Time </h1>
        <div style={{display:'flex', justifyContent:'center'}}>
            <header style={{alignItems:'center'}}>
            <Login setAuth={setAuth} isLoggedIn={isLoggedIn}/>
            <NavBar setAuth={setAuth} isLoggedIn={isLoggedIn}/>
            </header>
        </div>
        </div>
    </>
)

}