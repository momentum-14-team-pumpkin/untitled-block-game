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
            <div style={{color:'white', textAlign:'center', paddingTop:'20px', paddingBottom:'0', fontStyle:'italic'}}>
                <p><strong>'Left'</strong> & <strong>'Right'</strong> Arrows For Left and Right</p>
                <p><strong>'Spacebar'</strong> to Jump</p>
                <p><strong>'Down'</strong> Arrow to Pick Up and Put Down Blocks</p>
                <p><strong>'E'</strong> to Turn On or Shut Off Element Sounds</p>
                <p><strong>'M'</strong> to Turn On or Shut Off Music</p>
                <p><strong>'P'</strong> to Pause Game (time won't stop when paused)</p>
                <p><strong>'R'</strong> to Reset Level</p>
                <p>Hold <strong>'Z'</strong> to Reverse Time</p>

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
