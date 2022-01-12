import React from 'react'
import { Link } from 'react-router-dom'
// import './Welcomdoc.css'

function Navbar() {
    return (
        <div>
                <div className="mainheader">
                <div className="logo">
                    <img src="./images/pocdoc2.png"/>
                </div>

                <nav>
                    <a href="/">home</a>
                    <a href="/scan">Test</a>
                    <a href="/about">about</a>
                    <a href="/contact">contact</a>
                </nav>
            </div>
        </div>
    )
}

export default Navbar
