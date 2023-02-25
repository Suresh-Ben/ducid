import React from "react";

import './VerifingData.css';

function VerifingData() {
    return(
        <div>
            <input disabled={true} value={'dataType'} className='student-data student-data-datatype' type="text" />
            <input className='permission-box' type="checkbox" />
        </div>
    );
}

export default VerifingData;