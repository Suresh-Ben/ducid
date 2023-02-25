import React from "react";

import './About.css';

import SimpleButton from '../../componenets/requires/Buttons/SimpleButton';
import Navbar from '../../componenets/requires/Navbar';
import Footer from '../../componenets/requires/Footer';

function About() {
    return (
        <div className="home-about-section">
            <Navbar/>
    
            <div className="home-about-main">
                <h1>About ducid</h1><br /><br />

                <h2>What is the problem with today's verification system?</h2>
                <p>
                    Many companies offers discounts and some privileges to students after they get approved as students by sharing their college Id cards and etc.. These Id cards generally have much data than it required for a companies to authenticate a person as a student. for example a general college Id card contains student address, their blood group, family details (father and mother names) etcc.. these companies don't require these extra details. only thing these companies need is an proof that the person is student and no other sensitive data.
                </p>

                <h2>Our thoughts and solution</h2>
                <p>
                    Our idea is to make an decentralized universal college Id called DucId for students that involves in sharing the proof of some data instead of sharing the actual data. example student needs to share a proof that he/she is a student and not any other sensitive data. An person can identified as a adult by sharing a proof that he is older than 18 and not his/her actual age.
                </p>
                <p>
                    Our solution is to have some zero knowledge universal proofs for college students that prove that the person is a student, person is older than a particular age and the GPA of a student is greater than a particular GPA etc.. all these involved in sharing proofs and not the actual data.
                </p>
                <p>
                    we also have an idea of sharing the data to third party that is only allowed. Like student can allow a third party to see his blood group, age etc. for example, if a student is getting approved for a medical camp he can share his blood group, age only to medical camp authority and not any other unnecessary details.
                </p>
                <p>
                    Sharing data to third parties is an security issue. our idea is to store students' data as private data on blockchain to make an universal acceptable id for students that increases the data security. These DucId’s can be shared with anyone and can be accepted by any third party.
                </p>
                <br />

                <SimpleButton link='/' text='Back to home'/>
            </div>

            <Footer/>
        </div>
    )
}

export default About;