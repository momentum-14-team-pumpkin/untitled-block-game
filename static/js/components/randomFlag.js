import React from "react"
import { AceFlag } from "./ace"

export const RandomFlag = () => {
    const flags = [
        <AceFlag height='100%' />
    ]

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
        }}>
            {flags[Math.floor(Math.random() * flags.length)]}
        </div>
    )
}