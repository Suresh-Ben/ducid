import React from 'react';

import './Head.css';
import globe from '../../../files/images/globe.png';

import Navbar from '../../requires/Navbar';
import PrimaryButton from '../../requires/Buttons/PrimaryButton';

function Head(){
    return(
        <div className='home-head'>
            <Navbar/>
            <div className='home-head-main'>
                <div className='home-head-main-section'>
                    <div>
                        <h1> Lets get verified as a student with zero time and 100% security </h1>
                        <br />
                        <h3> ducid - Decentralized Universal College Id </h3>
                        <p> we make your identity as student decentralized and acceptable anywhere with 100% security, we use zero knowledge proofs called zk proofs to verify you as a student to any third party. None of your data will be shared to get you verified as a student. </p>

                        <PrimaryButton link={'./student'} text={"Make your own ducid"} />
                        <PrimaryButton link={'./college'} text={"Get verified as a college"} />
                    </div>
                </div>
                <div className='home-head-main-img-section'>
                    <img src={globe} alt="globe with connections png"/>
                </div>
            </div>
        </div>
    );
}

export default Head;
