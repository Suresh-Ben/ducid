import React,{ useState, useEffect } from 'react';

import './Auth.css';
import useContract from '../../hooks/useContract';

import Navbar from '../../componenets/requires/Navbar';
import Footer from '../../componenets/requires/Footer';
import AuthPopup from '../../componenets/College/AuthPopup';

function Auth() {
  const { address, contract, connectionError } = useContract();
  const [ isAuth, setIsAuth ] = useState(false);
  const [ collegesList, setCollegesList ] = useState([]);
  const [popup, setPopup] = useState(false);
  const [ selectedCollegeDetails, setSelectedCollegeDetails ] = useState({});

  async function loadAuth() {
    if(!contract) return;
    let tempOwner = await contract.getOwner();
    setIsAuth(tempOwner == address);

    if(isAuth) {
      let tempColleges = await contract.getAllCollegeIds();
      setCollegesList(tempColleges);
    }
  }

  useEffect(() => {
      setTimeout(() => {
        loadAuth();
      }, 1000); 
  },[contract, address, isAuth]);

  function togglePopup(collegeId, collegeName, collegeStatus) {
      setPopup(!popup);
      
      setSelectedCollegeDetails({
        collegeId : collegeId,
        collegeName : collegeName,
        collegeStatus : collegeStatus
      });
      console.log("called");
  }
  return (
    <div>
        <div style={{minHeight : '100vh'}}>
            <div className='nav-back'> <Navbar/> </div>
            <div style={{display : isAuth ? '' : 'none'}}>
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
                          {
                            collegesList.map((college) => {
                              return (<CollegeRow key={college} collegeId={college} contract={contract} togglePopup={togglePopup}/>)
                            })
                          }
                        </tbody>
                      </table>
                  {/* </div> */}
              </div>
            </div>

            <div style={{color:'red', display : !isAuth ? '' : 'none'}}>
              <div style={{display:'flex', justifyContent:'center'}}><h3>You are not the authority of the contract</h3></div>
            </div>
        </div>
        <AuthPopup contract={contract} collgeDetails={selectedCollegeDetails} togglePopup={togglePopup} visibility={popup} />
        <Footer/>
    </div>
  );
}

function CollegeRow(props) {

  const contract = props.contract;
  const [ collegeName, setCollegeName ] = useState("");
  const [ collegeVerificationStatus, setCollegeVerificationStatus ] = useState(0);

  async function loadCOllegDetails() {
    if(!contract) return;
    
    let tempCollegeName = await contract.getCollegeData(props.collegeId, "College Name");
    setCollegeName(tempCollegeName);

    let tempCollegeStatus = await contract.getCollegeStatus(props.collegeId);
    if(tempCollegeStatus == 0)
      setCollegeVerificationStatus("Not found");
    else if(tempCollegeStatus == 1)
      setCollegeVerificationStatus("Pending");
    else if(tempCollegeStatus == 2)
      setCollegeVerificationStatus("Verified");
    else if(tempCollegeStatus == 3)
      setCollegeVerificationStatus("Rejected");
  }

  useState(() => {
    loadCOllegDetails()
  },[contract]);

  return (
    <tr>
      <th scope="row">1</th>
      <td>{collegeName}</td>
      <td>{props.collegeId}</td>
      <td>{collegeVerificationStatus}</td>
      <td>
      <div className="authpopup-btn">
          <button style={{borderRadius: '.5rem'}} onClick={()=> {props.togglePopup(props.collegeId, collegeName, collegeVerificationStatus)}}>Update Status</button>
      </div>
      </td>
    </tr>
  );
}

export default Auth;