import React from "react"
import { useEffect } from "react"


export const PlayGame = ({token}) => {
    useEffect(() => {
        window.userToken = token
        document.querySelector("#gameIframe")
            .contentWindow
            .postMessage({
                kind: 'sendToken',
                token,
            })
    }, [token])
    return (
        <>
            <div style={{float:'left'}}>
                <div style={{color:'white', textAlign:'center', paddingTop:'20px', paddingBottom:'0', fontStyle:'italic', width:'50%', margin:'auto', marginBottom:'0'}}>
                    <div style={{display:'flex'}}>
                        <div style={{display:'flex'}}><img src='/static/assets/images/keys/left.png' style={{height:'1.5rem'}}/></div>
                        <div style={{display:'flex'}}><img src='/static/assets/images/keys/right.png' style={{height:'1.5rem'}}/></div>
                        <p> To Move Left and Right</p>
                    </div>
                        <div style={{display:'flex'}}><img src='/static/assets/images/keys/spacebar.png' style={{height:'1.5rem', width:'100px'}}/><p> to Jump</p></div>
                        <div style={{display:'flex'}}><img src='/static/assets/images/keys/Down.png' style={{height:'1.5rem'}}/><p>Pick Up and Put Down Blocks</p>
                        </div>
                    <div style={{display:'flex'}}><img src='/static/assets/images/keys/e.png' style={{height:'1.5rem'}}/><p> To Turn On or Shut Off Element Sounds</p></div>
                    <div style={{display:'flex'}}><img src='/static/assets/images/keys/m.png' style={{height:'1.5rem'}}/><p>To Turn On or Shut Off Music</p></div>
                    <div style={{display:'flex'}}><img src='/static/assets/images/keys/p.png' style={{height:'1.5rem'}}/> <p> to Pause Game (time won't stop when paused)</p></div>
                    <div style={{display:'flex'}}><img src='/static/assets/images/keys/r.png' style={{height:'1.5rem'}}/><p> To Reset Level</p></div>
                    <div  style={{display:'flex'}}><img src='/static/assets/images/keys/z.png' style={{height:'1.5rem'}}/><p> Hold to Reverse Time</p>
                    </div>
                </div>
                <iframe
                    allowFullScreen src='/game/'
                    id='gameIframe'
                    webkitallowfullscreen="true"
                    frameBorder='0'
                    style={{
                        width:'100vw',
                        height:'100vh',
                        marginBottom:'0'
                    }}
                />
            </div>

        </>
    )
}
