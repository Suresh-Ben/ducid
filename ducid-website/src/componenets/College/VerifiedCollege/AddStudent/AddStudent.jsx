import React from "react";

import './AddStudent.css';
import SimpleButton from "../../../requires/Buttons/SimpleButton";
import DataField from '../../../../componenets/requires/DataField';
function AddStudent(props) {
    return (
        <div style={props.visibility ? {} : {display : "none"}} className="popup">
            <div onClick={props.togglePopup} className="close-btn">&times;</div>
            <div className="form">
                <div>
                    <h2 style={{display:"flex", justifyContent:"center", margin:".4rem 0 1rem 0"}}>Add Student</h2>

                    <DataField changable={true} dataType="Student's Name" />
                    <DataField changable={true} dataType="Student's Age" />
                    <DataField changable={true} dataType="Student's Percentage" />

                    <div style={{marginTop:'.5rem'}} className="form-element">
                        <SimpleButton text = "+ new row"/>
                        <SimpleButton text = "Add Student"/>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddStudent;