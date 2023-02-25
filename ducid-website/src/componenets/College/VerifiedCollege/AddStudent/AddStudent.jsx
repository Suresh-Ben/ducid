import React, { useState } from "react";

import './AddStudent.css';
import SimpleButton from "../../../requires/Buttons/SimpleButton";
import DataField from '../../../../componenets/requires/DataField';
function AddStudent(props) {

    const contract = props.contract;
    const [ studentAddress, setStudentAddress ] = useState("");
    const [ studentName, setStudentName ] = useState("");
    const [ studentAge, setStudentAge ] = useState("");
    const [ studentPercentage, setStudentPercentage ] = useState("");

    const [ transactionMessage, setTransactionMessage ] = useState("");

    async function addstudent() {
        setTransactionMessage("Adding student to college dataBase...!!!")
        let tx = await contract.addNewStudent(studentAddress, studentName, studentAge, studentPercentage);
        tx.wait(1);
        setTransactionMessage("StudentAddedSuccessfully!!");
    }

    function closePopup() {
        setTransactionMessage("");
        setStudentAddress("");
        setStudentName("");
        setStudentAge("");
        setStudentPercentage("");

        props.togglePopup();
    }

    return (
        <div style={props.visibility ? {} : {display : "none"}} className="popup">
            <div onClick={closePopup} className="close-btn">&times;</div>
            <div className="form">
                <div>
                    <h2 style={{display:"flex", justifyContent:"center", margin:".4rem 0 1rem 0"}}>Add Student</h2>

                    <DataField data={studentAddress} updateData={setStudentAddress} changable={true} dataType="Student's Address" />
                    <DataField data={studentName} updateData={setStudentName} changable={true} dataType="Student's Name" />
                    <DataField data={studentAge} updateData={setStudentAge} changable={true} dataType="Student's Age" />
                    <DataField data={studentPercentage} updateData={setStudentPercentage} changable={true} dataType="Student's Percentage" />

                    <div style={{marginTop:'.5rem'}} className="form-element">
                        {/* <SimpleButton text = "+ new row"/> */}
                        <SimpleButton onClick={addstudent} text = "Add Student"/>
                    </div>

                    <div style={{display:"flex",justifyContent:"center"}} ><h6>{transactionMessage}</h6></div>

                </div>
            </div>
        </div>
    )
}

export default AddStudent;