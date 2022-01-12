import React from 'react'
import './Welcomedoc.css'
import { Link } from 'react-router-dom'

function Welcomedoc() {
    return (
        <div>
            <header>
            {/* <div className="mainheader">
                <div className="logo">
                    <img src="./images/pocdoc2.png"/>
                </div>

                <nav>
                    <Link to="/"><a href="#">home</a></Link>
                    <Link to="/scan"><a href="#">Test</a></Link>
                    <a href="#">about</a>
                    <a href="#">contact</a>
                </nav>
            </div> */}

            <main>
                <div className="left-sec">
                    <h2> Test your CT scan here.</h2>
                    <h1>  Save a trip to the doctor</h1>
                    <p>We are here for your care 24/7. Rest assured.</p>
                    <a href="/scan"><button>
                        Test your CT scan
                        
                    </button></a>
                </div>

                <div className="right-sec">
                    <figure>
                        <img className="doc1" src="./images/doc1.png"/>
                    </figure>
                </div>
            </main>
            </header>
        </div>
    )
}

export default Welcomedoc
