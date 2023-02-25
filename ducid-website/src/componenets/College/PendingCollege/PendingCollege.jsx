import React from "react";

import './PendingCollege.css';
import useContract from '../../../hooks/useContract';
import SimpleButton from '../../requires/Buttons/SimpleButton';
import IdSection from "../../requires/IdSection";
import Navbar from '../../requires/Navbar';
import Footer from '../../requires/Footer';
import ConnectionError from '../../requires/ConnectionError';
function PendingCollege() {
    const { address, contract, connectionError } = useContract();
    return (
        <div>
            <div className="nav-back"><Navbar/></div>
            <ConnectionError error={connectionError}/>
            <div className="pending-college-body">
            <form style={{display: "flex", justifyContent:'center'}} >
                    <div style={{width : '75%'}} className="form-group">
                        <h3 className="pending-college-heading" ><center>Your request is still pending!</center></h3>
                        <h5 style={{paddingTop : "1rem"}}><center>You can mail us to know the status of your verification.</center></h5>
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

export default PendingCollege;