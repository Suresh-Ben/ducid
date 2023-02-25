import './SimpleButton.css';

function SimpleButton(props) {
    return(
        <a href={props.link} >
            <button disabled={props.active} style={{backgroundColor : props.backgroundColor, color : props.color}} onClick={props.onClick} className="simple-button">
                {props.text}
            </button>
        </a>
    );
}

export default SimpleButton;