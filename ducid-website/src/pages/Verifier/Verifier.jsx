import React,{ useState } from 'react';

import './Verifier.css';

import useContract from '../../hooks/useContract';
import Navbar from '../../componenets/requires/Navbar';
import Footer from '../../componenets/requires/Footer';

import SimpleButton from '../../componenets/requires/Buttons/SimpleButton';
import DataField from '../../componenets/requires/DataField';
import ConnectionError from '../../componenets/requires/ConnectionError';

function Verifier() {
    const { address, contract, connectionError } = useContract();
    const [ studentVerificationStatus, setStudentVerifiactionStatus ] = useState();
    const [ studentId, setStudentID ] = useState("");

    async function getStudentDetails() {

        let tempStudentStatus = await contract.getStudentStatus(studentId);
        if(tempStudentStatus == 0)
            setStudentVerifiactionStatus("student not found");
        else if(tempStudentStatus == 1)
            setStudentVerifiactionStatus("Verified student");

        // let dataTypes = await contract.getStudentDataTypes(studentId);
        // let approvedDataTypes = [];
        // for(let i = 0; i < dataTypes.length; i++)
        // {
        //     let access = contract.changeThirdPartyAccess(address, studentId)
        // }
    }

    return (
        <div>
            <div style={{minHeight:'100vh'}}>
                <div className='nav-back'> <Navbar/> </div>
                <ConnectionError error={contract ? '' : 'Metamask is not installed or having issue connecting...!!!'}/>

                <div style={{margin:'1.5rem', display : 'flex', justifyContent: 'center'}}><div>
                    <p>Please enter student ducid:</p>
                    <input value={studentId} onChange={(event) => {setStudentID(event.target.value)}} style={{width:'30rem'}} className='student-data' type="text" /> <SimpleButton onClick={getStudentDetails} text="Check student data"/>
                    <div style={{display:'flex', justifyContent:'center'}} ><h6>{studentVerificationStatus}</h6></div>
                    <div style={{margin : '1rem'}}>
                        {/* <DataField  />
                        <DataField  /> */}
                    </div>
                </div></div>
            </div>
            <Footer/>
        </div>
    );
}

export default Verifier;