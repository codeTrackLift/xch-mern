import { Button, Card, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'

import { capitalize } from '../components/helpers/capitalize';

const sectionStyle = {
    margin: '0 auto',
    maxWidth: '960px',
}

const resetStyle = {
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
    zIndex: 10,
}

const greetingStyle = {
    margin: '2rem auto 0 auto',
    width: '960px',
    maxWidth: '90vw',
}

const cardHeaderStyle = {
    backgroundColor: 'rgb(50,50,50)',
    margin: '0rem -0.55rem',
    color: 'white',
    textShadow: '1px 1px 1px black',
}

const cardStyle ={
    margin: '2rem auto',
    padding: '0 0.5rem',
    maxWidth: '90vw',
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
}

export const UserData = () => {
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    const clearHomeActive = () => {
        const home = document.getElementById('homeNavLink');
        home.classList.remove('active');
    }
    setTimeout(clearHomeActive, 50);

    return (
        <section style={sectionStyle}>

            <div style={greetingStyle}>
                <h6 className='text-center'><span className='fw-bolder textShadowWhite dropShadow px-1'><span style={{letterSpacing: '-0,5px'}}>M<span className='mitMaroon'>I</span>T</span> | xCHANGE</span> believes in <span className='fw-bolder textShadowWhite dropShadow px-1'>xCHANGING</span> everything... <span className='textSilver'>(including user data)</span></h6>
                
            </div>

        </section>
    )
}