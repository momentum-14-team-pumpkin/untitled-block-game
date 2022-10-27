import React from "react"
import "/static/css/index.css"

export const GameDescription = () => {
    return(
        <p className='box' style={{color:'white', fontSize:'2rem', width:'min(35rem, 100%)', margin:'auto', marginTop:'1.5rem'}}>
            Help! Prof. Pretzel <img src='/static/assets/images/Stanley-left.png'></img> fell through a portal and went back in time.<br></br><br></br>
            The Professor needs to move blocks to get to the portals and back to the future. <br></br><br></br>
            Each portal <img src='/static/assets/images/portal.gif'></img> and level completed gets the Professor one step closer to home. <br></br>
        </p>
    )
}

