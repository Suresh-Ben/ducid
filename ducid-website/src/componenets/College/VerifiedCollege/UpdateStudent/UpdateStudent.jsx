import React from "react";

import './UpdateStudent.css';
import SimpleButton from "../../../requires/Buttons/SimpleButton";
import DataField from '../../../../componenets/requires/DataField';
function UpdateStudent(props){
    return (
        <div style={props.visibility ? {} : {display : "none"}} className="auth-popup">
            <div onClick={props.updateTogglePopup} className="close-btn">&times;</div>
            <div className="form">
                <div>
                    <h2 style={{display:"flex", justifyContent:"center", margin:".4rem 0 1rem 0"}}>Update Details</h2>

                    <DataField changable={true} dataType="Student's Name" />
                    <DataField changable={true} dataType="Student's Age" />
                    <DataField changable={true} dataType="Student's Percentage" />

                    <div style={{marginTop:'.5rem'}} className="form-element">
                        <SimpleButton text = "+ new row"/>
                        <SimpleButton text = "Update"/>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default UpdateStudent;