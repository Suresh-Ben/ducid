import React, {useState, useEffect} from "react";

import './VerifingData.css';

function VerifingData(props) {

    function setAccessFunction(event) {
        setAccess(event.target.value)
        var tempAccesses = props.accesses;
        tempAccesses[props.dataType] = access;
        props.setAccesses(tempAccesses);
    }

    const [access, setAccess] = useState();
    async function loadAccess() {
        let tempAccess = props.contract.checkAccessToThirdParty(props.thirdParty, props.studentId, props.dataType);
        setAccess(tempAccess);
    }
    useEffect(()=>{
        setTimeout(()=>{
            loadAccess();
        }, 1000)
    },[]);

    return(
        <div>
            <input disabled={true} value={props.dataType} className='student-data student-data-datatype' type="text" />
            <input value={access} onChange={(event) => setAccessFunction(event)} className='permission-box' type="checkbox" />
        </div>
    );
}

export default VerifingData;