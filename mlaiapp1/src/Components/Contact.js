import React from 'react'
import './Contact.css'

function Contact() {
    return (
        <div>
            <div className="contact-cards">
            <div class="card">
                
                <div class="container">
                    <h4><b>Kannan Gill</b></h4>
                    <p>3289443243</p>
                    <p>kannan@gmail.com</p>
                </div>
                </div>
                <div class="card">
                
                <div class="container">
                <h4><b>Sehaj Oberoi</b></h4>
                    <p>2384723832</p>
                    <p>sehaj@gmail.com</p>
                </div>
                </div>
                <div class="card">
               
                <div class="container">
                <h4><b>Mukund Bhatia</b></h4>
                    <p>3749205921</p>
                    <p>mukund@gmail.com</p>
                </div>
                </div>
            </div>

{/* helelloo */}
<div class="container2">
  <form action="">

    <label for="fname">Name</label>
    <input type="text" id="fname" name="Name" placeholder="Your name.."/>

    <label for="fname">Email</label>
    <input type="text" id="email" name="Email" placeholder="Your email.."/>

    <label for="subject">Subject</label>
    <textarea id="subject" name="subject" placeholder="Write something.." style={{height:'100px'}}></textarea>

    <input type="submit" value="Submit"/>

  </form>
</div>

        </div>
    )
}

export default Contact
