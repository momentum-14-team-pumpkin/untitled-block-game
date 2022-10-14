import { NavBar } from "./navbar"
import React from "react"


export const HomePage =()=> {

return(
    <>
    <h1 style={{fontSize:'70px', fontWeight:'600', backgroundImage:'URL(/static/assets/onetile.png)', backgroundSize:'contain', backgroundRepeat:'repeat', color:'transparent', WebkitBackgroundClip:'text', backgroundClip:'text', textAlign:'center'}}
    >Blocks of Time </h1>
    <header style={{alignItems:'center'}}>
    <NavBar />
    </header>
    </>
)

}