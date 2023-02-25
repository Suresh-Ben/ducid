import './SimpleButton.css';

function SimpleButton(props) {
    return(
        <a href={props.link} >
            <button type={props.type} onClick={props.onClick} className="simple-button">
                {props.text}
            </button>
        </a>
    );
}

export default SimpleButton;