import React from 'react';

import './College.css';
import NewCollege from '../../componenets/College/NewCollege/NewCollege';
import PendingCollege from '../../componenets/College/PendingCollege/PendingCollege';
import VerifiedCollege from '../../componenets/College/VerifiedCollege/VerifiedCollege';
function College() {
    return (
        <div>
            {/* <NewCollege/> */}
            {/* <PendingCollege/> */}
            <VerifiedCollege/>
        </div>
    );
}

export default College;