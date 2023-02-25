import React from "react";

import './AddStudent.css';
import SimpleButton from "../../../requires/Buttons/SimpleButton";
function AddStudent(props) {
    return (
        <div style={props.visibility ? {} : {display : "none"}} className="popup">
            <div onClick={props.togglePopup} className="close-btn">&times;</div>
            <div className="form">
                <div>
                    <h2 style={{display:"flex", justifyContent:"center", margin:".4rem 0 1rem 0"}}>Add Student</h2>

                    <div className="form-element">
                        <label htmlFor="student name">Student Name</label><br />
                        <input className="student-data student-add-data-input" type="text" id ="student-name" placeholder="Enter Student's name"/>
                    </div>
                    <div className="form-element">
                        <label htmlFor="student age">Student Age</label><br />
                        <input className="student-data student-add-data-input" type="text" id="student-age" placeholder="Enter Student's age" />
                    </div>
                    <div className="form-element">
                        <label htmlFor="student percentage">Student Percentage</label><br />
                        <input className="student-data student-add-data-input" type="text" id="student-percentage" placeholder="Enter Student's Percentage" />
                    </div>
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