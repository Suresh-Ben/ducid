import React,{useState, useEffect} from "react";

import './DataField.css';

function DataField(props) {

    const [ studentData, setStudentData ] = useState();
    useState(() => {
        setStudentData(props.data)
    },[]);

    function dataUpdate(event) {
        setStudentData(event.target.value);
    }

    return (
        <div>
            <input disabled={true} value={props.dataType} className='student-data student-data-datatype' type="text" />
            <input disabled={!props.changable} value={studentData} onChange={dataUpdate} className='student-data student-data-data' type="text" />
        </div>
    );
}

export default DataField;