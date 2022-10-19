import React from "react"
import { useState } from "react"
import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom"
import {Link} from "react-router-dom"
import "/static/css/index.css"
import { IframeHTMLAttributes } from "react"

export const PlayGame =() => {

    return(
        <div>
        <iframe
            src="/"
            width={1000} height={500}
            sandbox='allow-scripts allow-modal' 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"
        >
        </iframe>
        </div>
    )
}