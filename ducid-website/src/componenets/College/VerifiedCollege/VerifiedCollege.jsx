import React, { useState, useEffect } from "react";

import './VerifiedCollege.css';
import useContract from '../../../hooks/useContract';
import Navbar from '../../requires/Navbar';
import Footer from '../../requires/Footer';
import SimpleButton from "../../requires/Buttons/SimpleButton";
import AddStudent from "./AddStudent";
import ConnectionError from '../../requires/ConnectionError';
import UpdateStudent from '../VerifiedCollege/UpdateStudent';

function VerifiedCollege(props) {

    const collegeId = props.collegeId;
    const { address, contract, connectionError } = useContract();
    const [popup, setPopup] = useState(false);
    const [updatePopup, setupdatePopup] = useState(false);
    const [ studentsList, setStudentsList ] = useState([]);

    function togglePopup() {
        setPopup(!popup);
    }
    function updateTogglePopup() {
        setupdatePopup(!updatePopup);
    }

    async function loadAllStudents() {
        if(!contract) return;

        let tempStudentsList = await contract.getCollegeStudentIds();
        setStudentsList(tempStudentsList);
    }

    useEffect(() => {
        loadAllStudents();
    }, [contract, address, studentsList]);

    return (
        <div>
            <div className="nav-back"><Navbar/></div>
            <ConnectionError error={contract ? '' : 'Metamask is not installed or having issue connecting...!!!'}/>
            <div className="verified-college-section-body">

             <h5 className="verified-college-heading"><center>Students of your College</center></h5>
                <div className="verified-college-addstudent-btn">
                        <SimpleButton onClick={togglePopup} text={"Add Student"}/>
                        <AddStudent contract={contract} togglePopup={togglePopup} visibility={popup} />
                </div>
                <div style={{display:"flex", justifyContent:'center'}}>
                    <table style={{width:'75%'}} className="verified-college-table">
                        <thead className="verified-college-row">
                            <tr>
                            <th>Student Name</th>
                            <th>ducid</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                studentsList.map((studentId) => {
                                    return <StudentRow key={studentId} contract={contract} updatePopup={updatePopup} updateTogglePopup={updateTogglePopup} studentId={studentId} />
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div><Footer/></div>

        </div>
    )
}

function StudentRow(props) {

    const [studentName, setStudentName] = useState("");

    async function loadStudent() {
        let tempName = await props.contract.getStudentDataAsCollege(props.studentId, "Student Name", true);
        setStudentName(tempName);
    }

    useEffect(()=> {
        setTimeout(()=>{
            loadStudent();
        }, 1000);
    },[props.contract, studentName]);

    return (
        <tr>
            <td>{studentName}</td>
            <td>{props.studentId}</td>
            <td>
                <button onClick={props.updateTogglePopup} text={"Update Details"}>update student data</button>
                <UpdateStudent updateTogglePopup={props.updateTogglePopup} visibility={props.updatePopup} />
            </td>
        </tr>
    );
}

export default VerifiedCollege;
