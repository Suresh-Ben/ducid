import React from "react";

function ConnectionError(props)  {
    if(props.error)
        return(
            <div style={{color:'red',display:'flex',justifyContent:'center'}}>
                <h5>{props.error}</h5>
            </div>
        );
    else
        return(
            <div></div>
        );
}

export default ConnectionError;