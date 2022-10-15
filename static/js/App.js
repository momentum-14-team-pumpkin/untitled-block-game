import React from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom'
import { Login } from './components/login';
import useLocalStorageState from 'use-local-storage-state';
import { Register } from './components/register';
import axios from 'axios';
import { HomePage } from './components/homepage';

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
        </>
    )
}

export default App;