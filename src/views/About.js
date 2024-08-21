import React from 'react';
import aboutImage from './images/about/about-big.jpg'
import aboutImage1 from './images/about/about-tiny-1.jpg'
import aboutImage2 from './images/about/about-tiny-2.jpg'
import aboutImage3 from './images/about/about-tiny-3.jpg'

const About = () => {

    return (
        <div className='about'>
            <div className='about-left'>
                <img src={aboutImage} alt='About Us' style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
            <div className='about-right'>
                <div className='about-text'>
                    <p className='about-title'>China Gurme Hakkında</p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate id est laborum.
                    </p>
                    <p>
                        Ius ferri velit sanctus cu, sed at soleat accusata. Dictas prompta et Ut placerat legendos interpre.Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante Etiam sit amet orci eget. Quis commodo odio aenean sed adipiscing. Turpis massa tincidunt dui ut ornare lectus. Auctor elit sed vulputate mi sit amet. Commodo consequat. Duis aute irure dolor in reprehenderit in voluptate id est laborum.
                    </p>
                </div>
                <div className='about-tiny-image'>
                    <img src={aboutImage1} alt='About Us' style={{ maxWidth: '100%', height: 'auto' }} />
                    <img src={aboutImage2} alt='About Us' style={{ maxWidth: '100%', height: 'auto' }} />
                    <img src={aboutImage3} alt='About Us' style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
            </div>
        </div>
    );
};

export default About;
