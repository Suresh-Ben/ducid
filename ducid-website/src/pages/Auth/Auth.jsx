import React from 'react';

import './Auth.css';

import Navbar from '../../componenets/requires/Navbar';
import Footer from '../../componenets/requires/Footer';

function Auth() {
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
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">1</th>
                              <td>Mark</td>
                              <td>Otto</td>
                              <td>@mdo</td>
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