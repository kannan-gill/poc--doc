import React from 'react'
import './About.css'

function About() {
    return (
        <div>
            <div className="header">
                About
            </div>
            <div className="line"></div>
            <div className="content">
                Amidst the whole pandemic situation many things took a toll and its effect was observed in all walks of life. The pace of digitization increased and various new methods were seen being applied in places where shifting to a digital world was thought to be a huge task. One such place is the hospital. Surging covid cases not only put people suffering from covid in danger but the ones suffering from various other ailments that need to be timely addressed by doctor are left out in a life-death situation. Delayed checkups and appointments can be snatch away crucial time from some and can prove to be fatal. 
                But for people suffering from various diseases to go to hospital is no less than playing with their own lives especially right now, when germs are all around. This arose the need for our project. 
                PocDoc is a web application where user can upload their CT scan and a trained model will tell the user about the percentage abnormality of their scan. Abnormality in the scan will imply the presence of viral Pneumonia in the patient. Even at the slightest of risk, our model would suggest you to get it checked.  
            </div>
            <div className="content2">So rest assured and save a trip from the doctor.</div>
        </div>
    )
}

export default About
