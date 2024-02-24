import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Components

import Signup from './authentication/Signup'
import Login from './authentication/Login'
import User from './pages/User'
import Blog from './Components/Blog'
import BlogPost from './pages/BlogPost'

export default function App() {

    return (
        <>
            <Router>
                
                <Routes>

                    <Route exact path='/blogpost' Component={BlogPost} />
                    <Route exact path='/' Component={Signup} />
                    <Route exact path='/login' Component={Login} />
                    <Route exact path='/signup' Component={Signup} />
                    <Route exact path='/user' Component={User} />
                    <Route exact path='/blog' Component={Blog} />

                </Routes>

            </Router>
        </>
    )
}
