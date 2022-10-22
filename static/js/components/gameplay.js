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
            <div>
            <div style={{color:'white', textAlign:'center', marginTop:'0', fontStyle:'italic'}}>
                <p>Use Arrows For Left and Right</p>
                <p>Space to Jump</p>
                <p>Down Button to Pick Up and Put Down Blocks</p>
                <p>'M' to Turn On or Shut Off Music</p>
                <p>'E' to Turn On or Shut Off Element Sounds</p>
                <p>'P' to Pause Game (time won't stop when paused)</p>
                <p>'Z' to Reverse Time</p>
                <p>'R' to Reset Level</p>

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
