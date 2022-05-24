import React from 'react';
import { FooterList } from './partials/FooterList';

import xChange from '../images/xChangeMern.gif';
import youtube from '../images/yt_logo_light.png'
import gitHub from '../images/gitHubLogoBlack.png';
import twitter from '../images/twitterLogoBlue.png';
import linkedIn from '../images/linkedInLogoBlue.png';
import giphySecurity from '../images/giphySecurity.gif';

import '../styles/footer.css';

const footerStyle ={
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
}

const h4Style = {
    fontVariant: 'small-caps',
    marginTop: '1rem',
}

const xChangeStyle = {
    width: '20rem',
    maxWidth: '90vw',
    WebkitFilter: 'drop-shadow(1px 1px 1px dimgray)',
    filter: 'drop-shadow(1px 1px 1px dimgray)',
}

const securityStyle = {
    width: '100%',
    maxWidth: '30rem',
    display: 'block',
}

export const Footer = () => {
    
    const currentYear = new Date().getFullYear();

    return (
        <footer className='text-center mt-5' style={footerStyle}>

            <img src={xChange} className='img-fluid m-auto col-sm-4 imgHover' style={xChangeStyle} alt='MIT xCHANGE logo' />

            <div id='socials' className='text-center'>
                <h4 style={h4Style}>Follow us on the socials...</h4>
                <a href="https://github.com/codeTrackLift/" 
                    target="_blank" rel='noreferrer'>
                    <img src={gitHub} id='gitHubLogo'
                        className='socialLogo' alt="GitHub Icon"/>
                </a>
                <a href="https://www.linkedin.com/in/codebypete/" 
                    target="_blank" rel='noreferrer'>
                    <img src={linkedIn} id='linkedInLogo'
                        className='socialLogo' alt="LinkedIn Icon"/>
                </a>
                <a href="https://www.youtube.com/channel/UCVDOFoM5NXYrPoC02lbNJ-Q" 
                    target="_blank" rel='noreferrer'>
                    <img src={youtube} id='youTubeLogo'
                        className='socialLogo' alt="YouTube Icon"/>
                </a>
                <a href="https://twitter.com/codetracklift" 
                    target="_blank" rel='noreferrer'>
                    <img src={twitter} id='twitterLogo'
                        className='socialLogo' alt="Twitter Icon"/>
                </a>
            </div>

            <img id='giphySecurity' src={giphySecurity} alt="Security animated gif" style={securityStyle}/>
            
            <hr />
            <FooterList />

            <div id='footer'>
                <p>Copyright © {currentYear} 
                    <img src="https://codetracklift.github.io/codeTrackLift/logos/pharma2code_icon.gif" 
                        style={{height:'2rem',padding:'0 0.25rem'}}
                        alt="codeByPete Logo."/>
                    <a href='https://www.codebypete.com/' target='_blank' rel='noreferrer'>
                        <span className='fst-italic'>
                            <span style={{color:"white"}}>code</span>
                            <span style={{color:"#00857c"}}>By</span>
                            <span style={{color:"lime"}}>Pete </span>
                        </span>
                    </a>
                </p>
            </div>
    
        </footer>
    )
}