import React from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import App from './App'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

window.addEventListener('message', event => {
    if (event.data.kind === 'requestToken') {
        event.source.postMessage({
            kind: 'sendToken',
            token: window.userToken,
        })
    } else if (event.data.kind === 'wonGame') {
        if (window.onWonGame) {
            window.onWonGame()
        }
    }
})

root.render(
        <App />
    )
