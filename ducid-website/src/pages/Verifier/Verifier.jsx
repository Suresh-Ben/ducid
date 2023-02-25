import React from 'react';

import './Verifier.css';

import useContract from '../../hooks/useContract';
import Navbar from '../../componenets/requires/Navbar';
import Footer from '../../componenets/requires/Footer';

import SimpleButton from '../../componenets/requires/Buttons/SimpleButton';
import DataField from '../../componenets/requires/DataField';
import ConnectionError from '../../componenets/requires/ConnectionError';

function Verifier() {
    const { address, contract, connectionError } = useContract();
    return (
        <div>
            <div style={{minHeight:'100vh'}}>
                <div className='nav-back'> <Navbar/> </div>
                <ConnectionError error={contract ? '' : 'Metamask is not installed or having issue connecting...!!!'}/>

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