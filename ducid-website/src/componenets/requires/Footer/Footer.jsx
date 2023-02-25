import React from 'react';

import './Footer.css';
import Logo from '../../requires/Logo';
import youtube_logo from '../../../files/images/youtube_logo.png';
import twitter_logo from '../../../files/images/twitter_logo.png';
import discord_logo from '../../../files/images/discord_logo.png';
import github_logo from '../../../files/images/github_logo.png';

import SimpleButton from '../Buttons/SimpleButton';

function Footer(props) {
    return(
        <div className='footer'>

            <div className='footer-top'>
                <h2>Ready to get started?</h2>
                <div className='footer-top-buttons'>
                    <SimpleButton link={'/student'} text={'Make your own ducid'} />
                    <SimpleButton link={'/college'} text={'Get verified as college'} />
                </div>
            </div>

            <div className='footer-main'>

                <div className='footer-logos-section'>
                    <Logo/>
                    <div className='footer-logos'>
                        <img className='footer-small-log' src={youtube_logo} alt="youtube logo" />
                        <img className='footer-small-log' src={twitter_logo} alt="youtube logo" />
                        <img className='footer-small-log' src={discord_logo} alt="youtube logo" />
                        <img className='footer-small-log' src={github_logo} alt="youtube logo" />
                    </div>
                </div>

                <div className='footer-pages-links'>
                    <div>
                        <p style={{fontWeight : '625'}}>Pages</p>

                        <a href="/student">student</a><br />
                        <a href="/college">college</a><br />
                        <a href="/verifier">verifier</a>
                    </div>
                    <div>
                        <p style={{fontWeight : '625'}}>Developers</p>
                        
                        <a href="https://www.linkedin.com/in/suresh-bennabatthula-836854252/">Suresh Bennabatthula</a><br />
                        <a href="https://www.linkedin.com/in/jaddu-sai-nikhil-134766129/">Jaddu Sai Nikhil Naidu</a>
                    </div>
                    <div>
                        <p style={{fontWeight : '625'}}>Ducid</p>
                        
                        <a href="/about">about</a>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Footer;