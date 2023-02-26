import React, { useState, useEffect } from 'react';

import './Student.css';

import useContract from '../../hooks/useContract';
import Navbar from '../../componenets/requires/Navbar';
import Footer from '../../componenets/requires/Footer';
import SimpleButton from '../../componenets/requires/Buttons/SimpleButton';
import IdSection from '../../componenets/requires/IdSection';
import DataField from '../../componenets/requires/DataField';
import VerifingData from '../../componenets/Student/VerifingData';
import ConnectionError from '../../componenets/requires/ConnectionError/ConnectionError';

function Student() {
    const { address, contract, connectionError } = useContract();
    const [ studentTab, setStudentTab ] = useState(false);
    const [ studentVerificationStatus, setStudentVerificationStatus ] = useState(true);
    const [ studentId, setStudentId ] = useState("");
    const [ studentDataTypes, setStudentDataTypes ] = useState([]);
    const [ studentDatas, setStudentDatas ] = useState([]);

    const [ thirdParty, setThirdParty ] = useState("");
    const [ dataAccesses, setDataAccesses ] = useState({});
    const [ verifClick, setverifClick ] = useState(false);
    /**
     * @dev
     * false = dataTab
     * true = verifyTab
     */

    function changeTabs() {
        setStudentTab(!studentTab);
    }

    async function loadStudent() {
        if(!contract) return;

        let tempStudentId = await contract.getOwnStudentId();
        setStudentId(tempStudentId);

        let tempStudentDataTypes = await contract.getStudentDataTypes(tempStudentId);
        setStudentDataTypes(tempStudentDataTypes);

        let tempDataArray = [];
        for(let i = 0; i < studentDataTypes.length; i++)
        {
            let data = await contract.getStudentData(studentId, studentDataTypes[i]);
            tempDataArray.push({dataType: studentDataTypes[i], data: data});
        }
        setStudentDatas(tempDataArray);
    }

    useEffect(() => {
        setTimeout(() => {
            loadStudent();
        }, 1000); 
    },[address, contract, studentId, studentDataTypes]);

    async function updateDataAccesses() {
        setverifClick(!verifClick);
        let dataTypes = [];
        let dataaccessess = [];

        for(const type in dataAccesses)
        {
            dataTypes.push(type);
            dataaccessess.push(true);
        }
        console.log(thirdParty)
        console.log(dataAccesses)
        await contract.changeThirdPartyAccess(thirdParty, dataTypes, dataaccessess);
    }

    return (
        <div>
            <div style={{minHeight: '100vh'}}>
                <div className='nav-back'> <Navbar/> </div>
                <ConnectionError error={contract ? '' : 'Metamask is not installed or having issue connecting...!!!'}/>

                <div className='student-main-area'>
                    <div className='student-tab-changer'>
                        <SimpleButton onClick={changeTabs} text={studentTab ? "Check your data" : "Share your data"} />
                    </div>

                    <div>
                        <div style={!studentVerificationStatus ? {display : 'none'} : {}}>
                            <div style={{width : '75%', margin:'0 10rem 2rem 10rem'}}>
                                <IdSection ducid={studentId}/>
                            </div>
                            <div className='student-tabs'>
                                <div style={studentTab ? {display : 'none'} : {}} className='student-data-tab'>
                                    {
                                        studentDatas.map((Data) => {
                                            return <DataField key={Data.dataType} dataType={Data.dataType} data={Data.data} />
                                        })
                                    }

                                    {/* <div style={{display:'flex', justifyContent:'center'}} ><SimpleButton text="Update data" /></div> */}
                                </div>

                                <div style={!studentTab ? {display : 'none'} : {}} className='student-verification-tab'>
                                    <div style={{display:'flex', justifyContent:'center'}} >Please enter the third party public address to share your data</div><br />
                                    <input value={thirdParty} onChange={(event) => {setThirdParty(event.target.value)}} style={{width:'30rem'}} className='student-data' type="text" /> <SimpleButton text="Verify accessability"/>

                                    <div style={{display:'grid', justifyContent:'center'}}>
                                        {
                                            studentDataTypes.map((type) => {
                                                return <VerifingData verifClicked={verifClick} thirdParty={thirdParty} studentId={studentId} contract={contract} key={type} dataType={type} accesses={dataAccesses} setAccesses={(val) => setDataAccesses(val)}/>
                                            })
                                        }
                                    </div>
                                    <br />
                                    <div style={{display:'flex', justifyContent:'center'}} ><SimpleButton onClick={updateDataAccesses} text="Modify accessability" /></div>
                                </div>
                            </div>
                        </div>

                        <div style={studentVerificationStatus ? {display : 'none'} : {}} className='student-tabs'>
                            You are not a verified student. Please ask your college to your credentials.
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Student;