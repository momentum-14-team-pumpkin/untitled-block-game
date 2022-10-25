import React from "react"
import "/static/css/index.css"

export const GameDescription = () => {
    return(
        <p style={{color:'white', fontSize:'1.5rem', width:'min(40rem, 100%)', margin:'auto', marginTop:'5rem'}}>
            Prof. Pretzel <img src='static/assets/images/Stanley-left.png'></img> fell through a portal & went back in time.<br></br>
            Move blocks to get to the portals <img src='static/assets/images/portal.gif'></img><br></br>
            to help Prof. Pretzel get back to his time!
        </p>
    )
}

