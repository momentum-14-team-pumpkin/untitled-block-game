import React from "react"
import "/static/css/stripes.css"

export const AceFlag = ({width='100%', height='12rem'}) => {
    return (
        <>
            <div style={{width, height}}>
                <div className="stripes" direction="horizontal">
                    <div style={{backgroundColor: "#000000"}}></div>
                    <div style={{backgroundColor: "#a4a4a4"}}></div>
                    <div style={{backgroundColor: "#ffffff"}}></div>
                    <div style={{backgroundColor: "#810081"}}></div>
                </div>
            </div>
        </>
    )
}