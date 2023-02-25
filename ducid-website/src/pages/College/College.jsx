import React from 'react';

import './College.css';
import useContract from '../../hooks/useContract';
import NewCollege from '../../componenets/College/NewCollege/NewCollege';
import PendingCollege from '../../componenets/College/PendingCollege/PendingCollege';
import VerifiedCollege from '../../componenets/College/VerifiedCollege/VerifiedCollege';


function College() {
    const { address, contract, connectionError } = useContract();
    return (
        <div>
            {/* <NewCollege/> */}
            {/* <PendingCollege/> */}
            <VerifiedCollege/>
        </div>
    );
}

export default College;