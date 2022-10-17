import { NavBar } from "./navbar"
import React from "react"
import "/static/css/index.css"


export const HomePage =()=> {

return(
    <>
    <div>
    <h1 style={{fontFamily:'Bungee', textTransform:'uppercase', fontSize:'84px', fontWeight:'600',  color:'white', textAlign:'center'}}
    >Blocks of Time </h1>
    <header style={{alignItems:'center'}}>
    <NavBar />
    </header>
    </div>
    </>
)

}