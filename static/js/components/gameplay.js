import React from "react"
import { useEffect } from "react"

export const PlayGame = ({token}) => {
    const passToken = () => {
        window.userToken = token
        document.querySelector("#gameIframe")
            .contentWindow
            .postMessage({
                token
            })
    }
    useEffect(passToken, [token])
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
