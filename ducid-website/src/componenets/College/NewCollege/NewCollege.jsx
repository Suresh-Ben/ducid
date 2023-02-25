import React, { useState } from "react";

import './NewCollege.css';
import useContract from '../../../hooks/useContract';
import SimpleButton from '../../requires/Buttons/SimpleButton';
import IdSection from "../../requires/IdSection";
import Navbar from '../../requires/Navbar';
import Footer from '../../requires/Footer';
import ConnectionError from '../../requires/ConnectionError';

function NewCollege() {

    const [ collegeId, setCollegeId ] = useState("");
    const { address, contract, connectionError } = useContract();

    return (
        <div>
            <div className="nav-back"><Navbar/></div>
            <ConnectionError error={contract ? '' : 'Metamask is not installed or having issue connecting...!!!'}/>

            <div className="body new-college-section">
                <form style={{display: "flex", justifyContent:'center'}} >
                    <div style={{width : '75%'}} className="form-group">
                        <h3 className="heading" ><center>Get Verified as a College</center></h3>
                        <div style={{display: "flex", justifyContent:'center'}}>
                            <input style={{height: '2rem'}} type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter your College Name"/>
                        </div>
                        <div style={{display:"flex", justifyContent:"center"}}><SimpleButton text = {"Get Verified"}/></div>
                        
                        <br />
                        <div>
                            <IdSection purpose="college" ducid="this is ducid"/>
                            <div style={{display:"flex", justifyContent:"center", marginTop: '1rem'}}><SimpleButton text = {"Mail"}/></div>
                        </div>
                    </div>
                </form>
            </div>
            <div><Footer/></div>
        </div>
    )
}

export default NewCollege;