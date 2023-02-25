import React, { useState } from "react";

import './NewCollege.css';
import useContract from '../../../hooks/useContract';
import SimpleButton from '../../requires/Buttons/SimpleButton';
import IdSection from "../../requires/IdSection";
import Navbar from '../../requires/Navbar';
import Footer from '../../requires/Footer';
import ConnectionError from '../../requires/ConnectionError';

function NewCollege(props) {

    const [ collegeId, setCollegeId ] = useState(props.collegeId);
    const [ contract, setContract ] = useState(props.contract);
    const [ mailSection, setMailSection ] = useState(false);
    const [ collegeName, setCollegeName ] = useState("");
    const { email, subject, body } = {
        email : "sureshbennabatthula@gmail.com",
        subject : "ducid - college verification",
        body: "please verify our college at ducid : " + collegeId
    };

    async function getVerifiedAsCollege() {
        const transaction = await contract.addAsCollege(collegeName);
        await transaction.wait(1);

        let tempCollegeId = await contract.getOwnCollegeId();
        setCollegeId(tempCollegeId); 
        setMailSection(true);
    }

    return (
        <div>
            <div className="nav-back"><Navbar/></div>
            <ConnectionError error={contract ? '' : 'Metamask is not installed or having issue connecting...!!!'}/>

            <div className="body new-college-section">
                <form style={{display: "flex", justifyContent:'center'}} >
                    <div style={{width : '75%'}} className="form-group">
                        <h3 className="heading" ><center>Get Verified as a College</center></h3>
                        <div style={{display: "flex", justifyContent:'center'}}>
                            <input value={collegeName} onChange={(event) => {setCollegeName(event.target.value)}} style={{height: '2rem'}} type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter your College Name"/>
                        </div>

                        <div style={{display:"flex", justifyContent:"center"}}>
                            <button onClick={getVerifiedAsCollege} type='button' className="simple-button">
                                Get Verified
                            </button>
                        </div>
                        
                        <br />
                        <div style={mailSection ? {} : {display : 'none'}}>
                            <IdSection purpose="college" ducid={collegeId} />
                            <div style={{display:"flex", justifyContent:"center", marginTop: '1rem'}}>
                                <a style={{borderStyle:'solid', borderWidth:'2px'}} href={`mailto:${email}?subject=${subject || ""}&body=${body || ""}`} type='button' className="simple-button">
                                    Mail authority
                                </a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div><Footer/></div>
        </div>
    )
}

export default NewCollege;