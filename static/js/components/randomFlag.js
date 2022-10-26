import React from "react"
import { AceFlag } from "./ace"
import "/static/css/stripes.css"

export const RandomFlag = () => {
    const flags = [
        <div className="stripes" direction="horizontal" style={{
            width: '100%',
            height: '100%',
        }}>
            <div style={{backgroundColor: "#e50000"}}></div>
            <div style={{backgroundColor: "#ff8d00"}}></div>
            <div style={{backgroundColor: "#ffee00"}}></div>
            <div style={{backgroundColor: "#028121"}}></div>
            <div style={{backgroundColor: "#004cff"}}></div>
            <div style={{backgroundColor: "#770088"}}></div>
        </div>,
        <div className="stripes" direction="horizontal" style={{
            width: '100%',
            height: '100%',
        }}>
            <div style={{backgroundColor: "#d62800"}}></div>
            <div style={{backgroundColor: "#f07527"}}></div>
            <div style={{backgroundColor: "#ff9b56"}}></div>
            <div style={{backgroundColor: "#ffffff"}}></div>
            <div style={{backgroundColor: "#d462a6"}}></div>
            <div style={{backgroundColor: "#b55592"}}></div>
            <div style={{backgroundColor: "#a40062"}}></div>
        </div>,
        <div className="stripes" direction="horizontal" style={{
            width: '100%',
            height: '100%',
        }}>
            <div style={{backgroundColor: "#018e71"}}></div>
            <div style={{backgroundColor: "#21cfab"}}></div>
            <div style={{backgroundColor: "#99e9c2"}}></div>
            <div style={{backgroundColor: "#ffffff"}}></div>
            <div style={{backgroundColor: "#7cafe3"}}></div>
            <div style={{backgroundColor: "#4f47cd"}}></div>
            <div style={{backgroundColor: "#3b1379"}}></div>
        </div>,
        <div className="stripes" direction="horizontal" style={{
            width: '100%',
            height: '100%',
        }}>
            <div style={{backgroundColor: "#d60270"}}></div>
            <div style={{backgroundColor: "#d60270"}}></div>
            <div style={{backgroundColor: "#9b4f96"}}></div>
            <div style={{backgroundColor: "#0038a8"}}></div>
            <div style={{backgroundColor: "#0038a8"}}></div>
        </div>,
        <div className="stripes" direction="horizontal" style={{
            width: '100%',
            height: '100%',
        }}>
            <div style={{backgroundColor: "#5bcffb"}}></div>
            <div style={{backgroundColor: "#f5abb9"}}></div>
            <div style={{backgroundColor: "#ffffff"}}></div>
            <div style={{backgroundColor: "#f5abb9"}}></div>
            <div style={{backgroundColor: "#5bcffb"}}></div>
        </div>,
        <div className="stripes" direction="horizontal" style={{
            width: '100%',
            height: '100%',
        }}>
            <div style={{backgroundColor: "#000000"}}></div>
            <div style={{backgroundColor: "#9ad9ea"}}></div>
            <div style={{backgroundColor: "#00a3e8"}}></div>
            <div style={{backgroundColor: "#b5e51d"}}></div>
            <div style={{backgroundColor: "#ffffff"}}></div>
            <div style={{backgroundColor: "#ffc90d"}}></div>
            <div style={{backgroundColor: "#fc6667"}}></div>
            <div style={{backgroundColor: "#feaec9"}}></div>
            <div style={{backgroundColor: "#000000"}}></div>
        </div>,
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#ffd800'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 'min(60vw, 60vh)',
                height: 'min(60vw, 60vh)',
                backgroundColor: '#7902aa',
                borderRadius: '100vw',
            }}>
                <div style={{
                    width: 'min(40vw, 40vh)',
                    height: 'min(40vw, 40vh)',
                    backgroundColor: '#ffd800',
                    borderRadius: '100vw',
                }}></div>
            </div>
        </div>,
        <AceFlag height='100%' />,
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