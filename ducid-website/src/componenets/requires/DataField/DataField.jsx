import React,{useState, useEffect} from "react";

import './DataField.css';

function DataField(props) {

    function dataUpdate(event) {
        props.updateData(event.target.value);
    }

    return (
        <div>
            <input disabled={true} value={props.dataType} className='student-data student-data-datatype' type="text" />
            <input disabled={!props.changable} value={props.data} onChange={dataUpdate} className='student-data student-data-data' type="text" />
        </div>
    );
}

export default DataField;