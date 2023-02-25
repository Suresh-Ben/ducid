import React from "react";
import HeroSlider,{Slide} from "hero-slider";

import './Dev.css';
import Nikhil from '../../../files/images/nikhil.png';
import Suresh from '../../../files/images/suresh.png';

import SimpleButton from "../../requires/Buttons/SimpleButton";
function Dev(){
    return (
        <div
            style={{
                backgroundColor: '#d4d4d4'
            }}
        >
            <h3 style={{padding: '1.5rem 3.5rem'}}>Developers</h3>
            <HeroSlider
                height={'60vh'}
                slidingAnimation='left_to_right'
                orientation='horizontal'
                initialSlide={1}

                settings={{
                    shouldDisplayButtons: true,
                }}
            >
                <Slide style={{height : '60vh'}}>
                    <div className="developer-slide">
                        <div className="developer-area">
                            <div className="developer-about">
                                <div>
                                    <h5>Suresh Bennabatthula</h5>
                                    <p>
                                        I am Suresh. I am currently doing my bachelor's at NIT Jalandhar. I have started my journey with plain C++ ad learned many technologies and frameworks. I have been into game development, web development and now blockchain development. I have a vision that blockchain technology is going to be the future, I am currently making myself into blockchains.
                                    </p>
                                    <SimpleButton link='https://www.linkedin.com/in/suresh-bennabatthula-836854252/' text ="contact me"/>
                                </div>
                            </div>
                            <div className="developer-image">
                                <img src={Suresh} alt="nikhil - the developer" />
                            </div>
                        </div>
                    </div>
                </Slide>

                <Slide style={{height : '60vh'}}>
                    <div className="developer-slide">
                        <div className="developer-area">
                            <div className="developer-about">
                                <div>
                                    <h5>Jaddu Sai Nikhil Naidu</h5>
                                    <p>
                                        I am Jaddu Sai Nikhil Naidu. I'm currently pursuing Bachelor's in civil engineering at NIT Jalandhar. My programming journey started with learning Python. Learning C++ and DSA after that got me into web development. I have learned manny technologies and frameworks in web development. I believe developing something is an experience which feels fresh everytime. I keen to work hard and have a future in web development and also new technologies in future.
                                    </p>
                                    <SimpleButton link='https://www.linkedin.com/in/jaddu-sai-nikhil-134766129/' text="contact me"/>
                                </div>
                            </div>
                            <div className="developer-image">
                                <img src={Nikhil} alt="nikhil - the developer" />
                            </div>
                        </div>
                    </div>
                </Slide>
            </HeroSlider>
        </div>
    )
}

export default Dev;