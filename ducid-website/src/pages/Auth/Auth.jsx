import React,{ useState } from 'react';

import './Auth.css';

import Navbar from '../../componenets/requires/Navbar';
import Footer from '../../componenets/requires/Footer';
import AuthPopup from '../../componenets/College/AuthPopup';

function Auth() {
  const [popup, setPopup] = useState(false);
    function togglePopup() {
        setPopup(!popup);
    }
    return (
        <div>
            <div style={{minHeight : '100vh'}}>
                <div className='nav-back'> <Navbar/> </div>
                <h2  style={{display:'flex',justifyContent:'center', margin:'1rem'}}>List of all colleges</h2>
                <div style={{display:'flex',justifyContent:'center', margin:'1rem'}}>
                    {/* <div> */}
                        <table className="table auth-college-list-table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">College Name</th>
                              <th scope="col">College Id</th>
                              <th scope="col">Verification Status</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">1</th>
                              <td>Mark</td>
                              <td>Otto</td>
                              <td>@mdo</td>
                              <td>
                              <div className="authpopup-btn">
                                  <button onClick={togglePopup}>Update Status</button>
                                  <AuthPopup togglePopup={togglePopup} visibility={popup} />
                              </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                    {/* </div> */}
                </div>
                
            </div>
            <Footer/>
        </div>
    );
}

export default Auth;