import React from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom'
import { Login } from './components/login';
import useLocalStorageState from 'use-local-storage-state';
import { Register } from './components/register';
import axios from 'axios';
import { HomePage } from './components/homepage';
import '/static/css/index.css'

function App() {
    const [token, setToken] = useLocalStorageState('BlockOfTimeToken', null )
    const [username, setUsername] =  useLocalStorageState('BlockOfTimeUsername', '')

    const setAuth = (username, token) => {
        setToken(token)
        setUsername(username)
    }

    const handleLogout = () => {
        axios
        .post(
        'https://young-plateau-94674.herokuapp.com/token/logout',
        {},
        {
            headers: {
            Authorization: `Token ${token}`,
            },
        }
        )
        .then(() =>
        setAuth('', null),
        )
    }

    const isLoggedIn = username && token


    return (
        <>
        <div style={{backgroundImage:'URL(/static/assets/brick-black.png)', backgroundSize:'cover', minHeight:'100vh',}}>
        <BrowserRouter>
        <HomePage isLoggedIn={isLoggedIn} handleLogout={handleLogout} token={token}/>
            <Routes>
            <Route
                path="*"
                element={
                    <main>
                    <p>  Welcome </p>
                </main>
                }
                />  
            <Route path="/Login"
            element={<Login setAuth={setAuth} isLoggedIn={isLoggedIn} />} 
            />
            <Route path="/Register/" element={<Register setAuth={setAuth} isLoggedIn={isLoggedIn} />} 
            />
            </Routes>          
        </BrowserRouter>
        </div>
        </>
    )
}

export default App;