import { NavBar } from "./navbar"
import React from "react"
import { Login } from "./login"
import "/static/css/index.css"



export const HomePage =({setAuth, isLoggedIn, handleLogout, currUsername, token})=> {
return(
    <>
    <div>
        <div style={{display:'flex', justifyContent:'center'}}>
            <div style={{alignItems:'center'}}>
            <Login currUsername={currUsername} setAuth={setAuth} isLoggedIn={isLoggedIn} handleLogout={handleLogout} token={token}/>
            <br></br>
            </div>
        </div>
    </div>
    </>
)

}
