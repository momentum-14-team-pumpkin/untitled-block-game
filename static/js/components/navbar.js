import React from "react"

import {Link} from 'react-router-dom'

export const NavBar = (handleLogout, isLoggedIn) => {

    return(
        <>
        <div style={{ display:'flex', justifyContent:'center'}}>
                <div>
                    <Link to={"/login"} element =''style={{textDecoration:'none', color:'darkgray', paddingRight:'30px'}}
                    >Login</Link>
                </div>
                <br></br>
                <div>
                    <Link {...isLoggedIn} to="/" onClick={handleLogout} style={{textDecoration:'none', color:'darkgray', paddingRight:'30px'}}>
                        Logout</Link>
                </div>
        </div>  
            <div style={{ display:'flex', justifyContent:'center', color:'darkgray', paddingTop:'20px'}} >
                Don't have a login?<Link to="/register" style={{textDecoration:'none', color:'black', paddingRight:'30px'}} >  Register Here</Link>
            </div>

            <div style={{marginTop:'30px'}}>
                    <Link to="/" style={{textDecoration:'none', color:'darkgray', paddingRight:'30px'}} >LeaderBoard (Level 1)</Link>
                    <Link to="/" style={{textDecoration:'none', color:'darkgray', paddingRight:'30px'}} >LeaderBoard (Level 2)</Link>
                    <Link to="/" style={{textDecoration:'none', color:'darkgray', paddingRight:'30px'}} >LeaderBoard (Level 3)</Link>
            </div>
            <br></br>


    </>
    )
}