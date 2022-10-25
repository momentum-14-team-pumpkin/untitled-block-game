import React from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"


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
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <div>
                                <div style={{display:'inline-block'}}><img src='/static/assets/images/keys/left.png' style={{height:'1.5rem'}}/></div>
                                <div style={{display:'inline-block'}}><img src='/static/assets/images/keys/right.png' style={{height:'1.5rem'}}/></div>
                                <span style={{marginLeft: '1rem'}}>Move Left and Right</span>
                            </div>
                            <div style={{display:'inline-block'}}><img src='/static/assets/images/keys/spacebar.png' style={{height:'1.5rem', width:'100px'}}/><span style={{marginLeft: '1rem'}}>Jump</span></div>
                            <div style={{display:'inline-block'}}><img src='/static/assets/images/keys/down.png' style={{height:'1.5rem'}}/><span style={{marginLeft: '1rem'}}>Pick Up and Put Down Blocks</span></div>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <div style={{display:'inline-block'}}><img src='/static/assets/images/keys/e.png' style={{height:'1.5rem'}}/><span style={{marginLeft: '1rem'}}>Toggle Sound Effects</span></div>
                            <div style={{display:'inline-block'}}><img src='/static/assets/images/keys/m.png' style={{height:'1.5rem'}}/><span style={{marginLeft: '1rem'}}>Toggle Music</span></div>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <div style={{display:'inline-block'}}><img src='/static/assets/images/keys/p.png' style={{height:'1.5rem'}}/><span style={{marginLeft: '1rem'}}>Pause</span></div>
                            <div style={{display:'inline-block'}}><img src='/static/assets/images/keys/r.png' style={{height:'1.5rem'}}/><span style={{marginLeft: '1rem'}}>Reset Level</span></div>
                            <div style={{display:'inline-block'}}>Hold <img src='/static/assets/images/keys/z.png' style={{height:'1.5rem'}}/> to reverse time</div>
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
                        style={{
                            margin: 'auto',
                            width: 'calc(min(100vw, 880px))',
                            height: 'calc(min(100vh, 460px))',
                            marginBottom: '0'
                        }}
                    />
                </div>
            </div>

        </>
    )
}
