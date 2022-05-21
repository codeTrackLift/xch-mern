import React from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Nav, Row } from 'react-bootstrap';

import { HomeCard } from '../components/partials/HomeCard'
import { initScrollMagicHome } from '../components/helpers/scrollMagic';

import mobileEuro from '../images/mobileEuro.jpg';
import qrxChange from '../images/qrxChange.png';
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

export const Home = () => {
    
    setTimeout(initScrollMagicHome,50);

    return (
        <section style={sectionStyle}>

            <div style={signUpStyle} className='row'>
                <h5 className='text-start mt-4'>Create an <span className='fw-bolder textShadowWhite dropShadow'>xCHANGE</span> account today!</h5>
                <img id='mobileEuro' src={mobileEuro} style={mobileStyle} className='img-fluid col-8' alt='Mobile banking with Euros'/>
                <Nav.Link className='col-4 my-auto' to='/account/' href='/account/' as={NavLink}>
                    <Button id='signUpButton' style={signUpButtonStyle}>Register</Button>
                </Nav.Link>
                <div className='d-none d-md-none d-lg-block'>
                    <div className='row'>
                        <h5 className='text-center my-auto col-8'>Now in the App Store, bank with us on mobile!</h5>
                        <img src={qrxChange} style={qrxChangeStyle} className='img-fluid col-4 imgHover' alt='QR code for MIT xChange Bad Bank Project'/>
                    </div>
                </div>
            </div>

            <div className='container-fluid text-center'>
                <h5><u>Video Tour</u></h5>
                <iframe 
                    className='ratio-16x9 boxShadow' 
                    src="https://youtube.com/embed/qeuvfEmJ7_s" 
                    frameBorder="0" 
                    allowFullScreen 
                    title='MIT xCHANGE bootcamp project video' 
                    style={{
                        height: 'clamp(10rem,15rem,20rem)',
                        width: 'clamp(15rem,25rem,95vw)',
                    }}
                />
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