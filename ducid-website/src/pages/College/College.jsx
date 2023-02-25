import React, {useState, useEffect} from 'react';

import './College.css';
import useContract from '../../hooks/useContract';
import NewCollege from '../../componenets/College/NewCollege/NewCollege';
import PendingCollege from '../../componenets/College/PendingCollege/PendingCollege';
import VerifiedCollege from '../../componenets/College/VerifiedCollege/VerifiedCollege';


function College() {
    const { address, contract, connectionError } = useContract();
    const [ collegeId, setCollegeId ] = useState("");
    const [ collegeStatus, setCollegeStatus ] = useState();
    /**
     * @dev 
     * 0 - notfound
     * 1 - pending
     * 2 - verified
     */

    async function loadCollege() {
        if(!contract) return;
        let tempCollegeId = await contract.getOwnCollegeId();
        setCollegeId(tempCollegeId);

        let tempCollegeStatus = await contract.getCollegeStatus(collegeId);
        setCollegeStatus(tempCollegeStatus);
    }

    useEffect(() => {
        setTimeout(() => {
            loadCollege();
        }, 1000); 
    },[contract, address, collegeId, collegeStatus]);

    if(collegeStatus == 0) 
        return <NewCollege contract={contract} collegeId={collegeId} />
    if(collegeStatus == 1) 
        return <PendingCollege contract={contract} collegeId={collegeId} />
    if(collegeStatus == 2) 
        return <VerifiedCollege contract={contract} collegeId={collegeId} />
}

export default College;