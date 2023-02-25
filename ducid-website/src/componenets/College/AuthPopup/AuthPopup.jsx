import React,{useState} from "react";

import './AuthPopup.css';
import SimpleButton from "../../requires/Buttons/SimpleButton";
function AuthPopup(props) {

    const contract = props.contract;
    const [ treansactionreciept, setTransactionReciept ] = useState("");

    async function approveCollege() {
        setTransactionReciept("Transaction pending...!!!")
        let tx = await contract.approveCollege(props.collgeDetails.collegeId);
        await tx.wait(1);
        setTransactionReciept("");
    }

    async function rejectCollege() {
        setTransactionReciept("Transaction pending...!!!")
        let tx = await contract.rejectCollege(props.collgeDetails.collegeId);
        await tx.wait(1);
        setTransactionReciept("");
    }

    return (
        <div style={props.visibility ? {} : {display : "none"}} className="auth-popup">
            <div onClick={props.togglePopup} className="close-btn">&times;</div>
            <div className="form">
                <div>
                    <h2 style={{display:"flex", justifyContent:"center", margin:".4rem 0 1rem 0"}}>Update Status</h2>
                    College Name <br />
                    <input style={{width : '40rem'}} type="text" disabled ={true} className ="student-data" value ={props.collgeDetails.collegeName} /> <br />
                    College Id <br />
                    <input style={{width : '40rem'}}  type="text" disabled ={true} className ="student-data" value={props.collgeDetails.collegeId} /> <br />
                    College Verification Status <br />
                    <input style={{width : '40rem'}}  type="text" disabled ={true} className ="student-data" value={props.collgeDetails.collegeStatus} />
                    
                    <div style={{marginTop:'.5rem'}} className="form-element">
                        <SimpleButton onClick={approveCollege} active={props.collgeDetails.collegeStatus == "Verified" ? true : false} text = "Accept"/>
                        <SimpleButton onClick={rejectCollege} active={props.collgeDetails.collegeStatus == "Rejected" ? true : false} text = "Reject"/>
                    </div>
                    <div style={{display:"flex", justifyContent:'center'}}><h6>{treansactionreciept}</h6></div>
                </div>
            </div>
        </div>
        
    )

}

export default AuthPopup;