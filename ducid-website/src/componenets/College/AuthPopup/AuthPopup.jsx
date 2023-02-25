import React,{us} from "react";

import './AuthPopup.css';
import SimpleButton from "../../requires/Buttons/SimpleButton";
function AuthPopup(props) {
    return (
        <div style={props.visibility ? {} : {display : "none"}} className="auth-popup">
            <div onClick={props.togglePopup} className="close-btn">&times;</div>
            <div className="form">
                <div>
                    <h2 style={{display:"flex", justifyContent:"center", margin:".4rem 0 1rem 0"}}>Update Status</h2>
                    College Name <br />
                    <input style={{width : '25rem'}} type="text" disabled ={true} className ="student-data" text ="College Name" /> <br />
                    College Id <br />
                    <input style={{width : '25rem'}}  type="text" disabled ={true} className ="student-data" text ="College id" />
                    <div style={{marginTop:'.5rem'}} className="form-element">
                        <SimpleButton text = "Accept"/>
                        <SimpleButton text = "Reject"/>
                    </div>

                </div>
            </div>
        </div>
        
    )

}

export default AuthPopup;