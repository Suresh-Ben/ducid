import React, {useState} from 'react';

import './Student.css';

import useContract from '../../hooks/useContract';
import Navbar from '../../componenets/requires/Navbar';
import SimpleButton from '../../componenets/requires/Buttons/SimpleButton';
import IdSection from '../../componenets/requires/IdSection';
import DataField from '../../componenets/requires/DataField';
import VerifingData from '../../componenets/Student/VerifingData';

function Student() {
    const { address, contract, connectionError } = useContract();
    const [ studentTab, setStudentTab ] = useState(false);
    const [ studentVerificationStatus, setStudentVerificationStatus ] = useState(true);
    /**
     * @dev
     * false = dataTab
     * true = verifyTab
     */

    function changeTabs() {
        setStudentTab(!studentTab);
    }

    return (
        <div>
            <div className='nav-back'> <Navbar/> </div>

            <div className='student-main-area'>
                <div className='student-tab-changer'>
                    <SimpleButton onClick={changeTabs} text={studentTab ? "Check your data" : "Share your data"} />
                </div>

                <div>
                    <div style={!studentVerificationStatus ? {display : 'none'} : {}}>
                        <div style={{width : '75%', margin:'0 10rem 2rem 10rem'}}>
                            <IdSection/>
                        </div>
                        <div className='student-tabs'>
                            <div style={studentTab ? {display : 'none'} : {}} className='student-data-tab'>
                                <DataField data="This is data" dataType="dataType" changable={true} />

                                <div style={{display:'flex', justifyContent:'center'}} ><SimpleButton text="Update data" /></div>
                            </div>
                            <div style={!studentTab ? {display : 'none'} : {}} className='student-verification-tab'>
                                <div style={{display:'flex', justifyContent:'center'}} >Please enter the third party public address to share your data</div><br />
                                <input style={{width:'30rem'}} className='student-data' type="text" /> <SimpleButton text="Verify accessability"/>

                                <div style={{display:'flex', justifyContent:'center'}}>
                                    <VerifingData/>
                                </div>
                                <br />
                                <div style={{display:'flex', justifyContent:'center'}} ><SimpleButton text="Modify accessability" /></div>
                            </div>
                        </div>
                    </div>

                    <div style={studentVerificationStatus ? {display : 'none'} : {}} className='student-tabs'>
                        You are not a verified student. Please ask your college to your credentials.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Student;