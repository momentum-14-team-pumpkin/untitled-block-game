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
        <iframe
            src='/'
            id='gameIframe'
            frameBorder='0'
            style={{
                width:'100vw',
                height:'100vh'
            }}
        />
    )
}
