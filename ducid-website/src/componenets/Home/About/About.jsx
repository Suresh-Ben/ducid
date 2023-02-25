import React from "react";

import './About.css';
import about from '../../../files/images/about.png';

import SecondaryButton from "../../requires/Buttons/SecondaryButton";

function About(){
    return (
        <div className = "about-main">
            <div className = "about-ducid-image-section">
                <img className="about-logo" src={about} alt="about img" />
            </div>
            <div className="about-ducid-main-section">
                <div>
                    <h1>About</h1>
                    <p style={{fontSize : '20px'}}>Sharing data to third parties is an security issue. Our idea is to store student's data as private data on blockchain to make an universal acceptable id for students that increases the data security. These DucId's can be shared with anyone and can be accepted by any third party.</p>
                    <SecondaryButton link={'./about'} text={"Know More"}/>
                </div>
            </div>
        </div>
    )
}

export default About;