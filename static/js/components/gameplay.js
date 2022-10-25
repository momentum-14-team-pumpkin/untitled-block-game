import React from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import "/static/css/keys.css"
import { GameDescription } from "./gamedetails"


export const PlayGame = ({token}) => {
    const navigate = useNavigate()

    useEffect(() => {
        window.onWonGame = () => {
            window.onWonGame = null
            navigate('/')
        }
    }, [])
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
                <div style={{color:'white', paddingTop:'20px', paddingBottom:'0', fontStyle:'italic', width:'50%', margin:'auto', marginBottom:'0'}}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '1rem',
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <div>
                                <div className="game-key">&#x2190;</div>
                                <div className="game-key">&#x2192;</div>
                                <span style={{marginLeft: '1rem'}}>Move Left and Right</span>
                            </div>
                            <div><div className="game-key spacebar">Spacebar</div><span style={{marginLeft: '1rem'}}>Jump</span></div>
                            <div><div className="game-key">&#x2193;</div><span style={{marginLeft: '1rem'}}>Pick Up and Put Down Blocks</span></div>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <div style={{display:'inline-block'}}><div className="game-key">E</div><span style={{marginLeft: '1rem'}}>Toggle Sound Effects</span></div>
                            <div style={{display:'inline-block'}}><div className="game-key">M</div><span style={{marginLeft: '1rem'}}>Toggle Music</span></div>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <div style={{display:'inline-block'}}><div className="game-key">P</div><span style={{marginLeft: '1rem'}}>Pause</span></div>
                            <div style={{display:'inline-block'}}><div className="game-key">R</div><span style={{marginLeft: '1rem'}}>Reset Level</span></div>
                            <div style={{display:'inline-block'}}>Hold <div className="game-key">Z</div> to reverse time</div>
                        </div>
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    width: '100vw',
                    justifyContent: 'center',
                }}>
                    <iframe
                        allowFullScreen src='/game/'
                        id='gameIframe'
                        webkitallowfullscreen="true"
                        frameBorder='0'
                        style={{
                            margin: 'auto',
                            width: 'calc(min(100vw, 880px))',
                            height: 'calc(min(100vh, 460px))',
                            marginBottom: '0',
                            overflow: 'hidden',
                        }}
                    />
                </div>
            </div>

        </>
    )
}
