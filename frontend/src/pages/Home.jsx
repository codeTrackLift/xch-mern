import React from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Nav, Row } from 'react-bootstrap';
import { FaCoins, FaLandmark, FaMobileAlt, FaUserCheck } from 'react-icons/fa';

import { HomeCard } from '../components/partials/HomeCard'
import { initScrollMagicHome } from '../components/helpers/scrollMagic';

import reactStatic from '../images/xchMern_reactComponentsStatic.jpg'
import reactAnimated from '../images/xchMern_reactComponentsAnimated.gif'
import hourGlass from '../images/hourGlass.gif'

import mobileEuro from '../images/mobileEuro.jpg';
import qrxchmern from '../images/qr-xchmern.png';
import mernGoals from '../images/mernGoals.png';
import pomodoro from '../images/giphyPomodoro.gif';
import markdown from '../images/markdownPreviewer.jpg';
import drumCalc from '../images/drumCalc.gif';
import listIcon from '../images/listIcon.png';

import '../styles/home.css';

const sectionStyle = {
    maxWidth: '1400px',
    marginInline: 'auto',
}

const silverStyle = {
    margin: '2rem auto',
    paddingBlock: '1rem',
    backgroundColor: 'gainsboro',
}

const mobileStyle ={
    margin: '2rem auto',
    maxHeight: '20rem',
}

const signUpStyle = {
    margin: '2rem auto',
    maxWidth: '960px',
}

const signUpButtonStyle = {
    marginRight: '1rem',
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
}

const qrxChangeStyle = {
    width: '25vw',
    maxWidth: '10rem',
}

const componentDivStyle = {
    margin: '4rem auto',
    maxWidth: '960px',
    width: '100%',
}

const componentButtonStyle = {
    border: '0.5rem outset silver',
    borderRadius: '2px',
}

export const Home = ({setTitle}) => {
    const [animateReact, setAnimateReact] = React.useState(false);
    const [reactImage, setReactImage] = React.useState(reactStatic);
    
    setTimeout(initScrollMagicHome,50);

    const handleAnimateReact = () => {
        if (animateReact) {
            setAnimateReact(false);
            setReactImage(hourGlass);
            setReactImage(reactAnimated);
            return;
        } 
        setAnimateReact(true);
        setReactImage(reactStatic);
    }

    return (
        <section style={sectionStyle}>

            <div style={signUpStyle} className='row'>
                <h5 className='text-start mt-4'><span className='fw-bolder textShadowWhite dropShadow'><span style={{letterSpacing: '-0,5px'}}>M<span className='mitMaroon'>I</span>T</span> | xCHANGE</span> <i className='px-1'><FaLandmark /></i> has been upgraded...</h5>
                <h5 className='text-end mt-4'>Now with <i><FaUserCheck /></i> JSON Web Tokens and CRUD <i><FaCoins /></i> functionality!</h5>
                <img id='mobileEuro' src={mobileEuro} style={mobileStyle} className='img-fluid col-8' alt='Mobile banking with Euros'/>
                <Nav.Link className='col-4 my-auto' to='/account/' href='/account/' as={NavLink}>
                    <Button 
                        id='signUpButton' 
                        style={signUpButtonStyle}
                        onClick={() => {setTitle('Account | xCH MERN Bank')}}
                    >Register</Button>
                </Nav.Link>
                <div className='d-none d-md-none d-lg-block'>
                    <div className='row'>
                        <h5 className='text-center my-auto col-8'>Deployed on Heroku, but still in the <i><FaMobileAlt /></i> App Store!<br/></h5>
                        <img src={qrxchmern} style={qrxChangeStyle} className='img-fluid col-4 imgHover' alt='QR code for MIT xChange MERN Bank'/>
                    </div>
                </div>
            </div>

            <div style={componentDivStyle} className='boxShadow'>
                <button style={componentButtonStyle} onClick={handleAnimateReact}>
                    <img src={reactImage} alt='xCHANGE front end React component diagram'  className='img-fluid' />
                </button>
            </div>
            
            <Row style={silverStyle} className='gap-2'>

                <h2 className='text-center'>Limited Time Special Offer... FREE Productivity Apps!</h2>

                <HomeCard 
                    id={'goalsCard'}
                    header={'GoalSetter | MERN CRUD App'}
                    title={<img src={mernGoals} alt='Full stack goal setter app' className='img-fluid imgHover' />}
                    text1={`Overwhelmed with your goals, or need help tracking progress?`}
                    text2={`Use our Full Stack GoalSetter! It uses JSON Web Tokens and is hosted on Heroku!`}
                    btnClass={''}
                    href={'https://goalsbypete.herokuapp.com/'}
                    btnText={'Set Goals'}
                />

                <HomeCard 
                    id={'pomodoroCard'}
                    header={'Pomodoro Clock + Test Mode'}
                    title={<img src={pomodoro} alt='Pomodoro app animated gif' className='img-fluid imgHover' />}
                    text1={`Do you have trouble focusing?  Are you easily distracted?`}
                    text2={`Use our Pomodoro Clock, with integrated 'Test Mode' to enhance your productivity!`}
                    btnClass={'float-end'}
                    href={'https://codetracklift.github.io/pomodoro'}
                    btnText={'Pomodoro'}
                />

                <HomeCard 
                    id={'markdownCard'}
                    header={'Markdown Previewer React App'}
                    title={<img src={markdown} alt='HTML Markdown Previewer build in React JS' className='img-fluid imgHover'/>}
                    text1={`Too busy to check if your HTML markdown is semantically correct?`}
                    text2={`No problem! Just use our free Markdown Previewer!  It was built using create-react-app!`}
                    btnClass={''}
                    href={'https://codetracklift.github.io/markdown-previewer'}
                    btnText={'Markdown'}
                />

                <HomeCard 
                    id={'drumCalcCard'}
                    header={'Drum Set Calculator'}
                    title={<img src={drumCalc} alt='Drum set calculator' className='img-fluid imgHover' />}
                    text1={`Ever wanted to play the drums while doing math?`}
                    text2={`Well now you can! Practice your rhythm as you enter digits and perform arithmetic.`}
                    btnClass={'float-end'}
                    href={'https://codetracklift.github.io/odin-calc'}
                    btnText={'Calculator'}
                />

                <HomeCard 
                    id={'todoCard'}
                    header={'To-Do Dashboard + Weather'}
                    title={<img src={listIcon} alt='To do list icon' className='img-fluid imgHover px-5'/>}
                    text1={`Tired of losing your To-Do list after a reload?`}
                    text2={`Check out this Dashboard that retains your To-Dos in local memory. It also includes a weather widget!`}
                    btnClass={''}
                    href={'https://codetracklift.github.io/todo'}
                    btnText={'Dashboard'}
                />

            </Row>
            
        </section>
    )
}