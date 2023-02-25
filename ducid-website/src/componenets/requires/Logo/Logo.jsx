import './Logo.css';
import ducid_logo from '../../../files/images/ducid_logo.png';

function Logo() {
    return(
        <a href='/' className='logo-section'>
            <img className='logo' src={ducid_logo} alt="logo"/>
            <h2 className='logo-text'>ucid</h2>
        </a>
    );
}

export default Logo;