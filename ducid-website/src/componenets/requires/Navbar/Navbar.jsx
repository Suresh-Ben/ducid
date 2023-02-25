import React from 'react';

import './Navbar.css';

import Logo from '../Logo';
import TouchableLink from '../../Navbar/TouchableLink';

function Navbar() {
    return(
        <div className='navbar'>
            <Logo/>
            <div className='navbar-links-section'>
                <TouchableLink text={'Student'} link='/student' padding={'0 1rem'}/>
                <TouchableLink text={'College'} link='/college' padding={'0 1rem'}/>
                <TouchableLink text={'Verifier'} link='/verifier' padding={'0 1rem'}/>
            </div>
        </div>
    );
}

export default Navbar;