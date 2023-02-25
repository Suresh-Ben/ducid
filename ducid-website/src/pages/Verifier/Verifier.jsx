import React from 'react';

import './Verifier.css';

import Navbar from '../../componenets/requires/Navbar';
import Footer from '../../componenets/requires/Footer';

import SimpleButton from '../../componenets/requires/Buttons/SimpleButton';
import DataField from '../../componenets/requires/DataField';

function Verifier() {
    return (
        <div>
            <div style={{minHeight:'100vh'}}>
                <div className='nav-back'> <Navbar/> </div>

                <div style={{margin:'1.5rem', display : 'flex', justifyContent: 'center'}}><div>
                    <p>Please enter student ducid:</p>
                    <input style={{width:'30rem'}} className='student-data' type="text" /> <SimpleButton text="Check student data"/>

                    <div style={{margin : '1rem'}}>
                        <DataField  />
                        <DataField  />
                    </div>
                </div></div>
            </div>
            <Footer/>
        </div>
    );
}

export default Verifier;