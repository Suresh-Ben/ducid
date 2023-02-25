import React from "react";

import './VerifiedCollege.css';
import Navbar from '../../requires/Navbar';
import Footer from '../../requires/Footer';
import SimpleButton from "../../requires/Buttons/SimpleButton";

function VerifiedCollege() {
    return (
        <div>
            <div className="nav-back"><Navbar/></div>
            <div className="verified-college-section-body">
                <h5 className="verified-college-heading"><center>Students of your College</center></h5>
                <div className="verified-college-addstudent-btn"><SimpleButton text={"Add Student"}/></div>
                <div style={{display:"flex", justifyContent:'center'}}>
                    <table  className="verified-college-table">
                        <tr className="verified-college-row">
                            <th>Student Name</th>
                            <th>ducid</th>
                            <th>Verification Status</th>
                        </tr>
                        <tr>
                            <td>Student1</td>
                            <td>ducid</td>
                            <td>&#9989;</td>
                        </tr>
                        <tr>
                            <td>Student2</td>
                            <td>ducid</td>
                            <td>&#x1F7E0;</td>
                        </tr>
                    </table>
                </div>            
            </div>
            <div><Footer/></div>

        </div>
    )
}

export default VerifiedCollege;