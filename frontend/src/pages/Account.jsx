import React from 'react'
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'

import { CurrentUser } from '../components/partials/CurrentUser';
import { Create } from '../components/partials/Create';
import { LogIn } from '../components/partials/LogIn';
import { GuestLogIn } from '../components/partials/GuestLogIn';

import cartoonMoney from '../images/cartoonMoney.png';

import '../styles/account.css';

const sectionStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
}

const articleStyle = {
    margin: '3rem auto',
    padding: '0 0.5rem',
    maxWidth: '960px',
}

const moneyStyle = {
    width: '30%',
    maxWidth: '10rem',
    margin: '2rem auto -3rem 10vw',
}

export const CreateAccount = () => {
    const { pathname } = useLocation();
    const { user } = useSelector((state) => state.auth)

    const clearHomeActive = () => {
        const home = document.getElementById('homeNavLink');
        const deposit = document.getElementById('depositNavLink');
        const withdraw = document.getElementById('withdrawNavLink');
        const userData = document.getElementById('userDataNavLink');
        home.classList.remove('active');
        deposit.classList.remove('active');
        withdraw.classList.remove('active');
        userData.classList.remove('active');
    }
    setTimeout(clearHomeActive, 50);

    return (
        <section style={sectionStyle}>
            
            <div className='text-end'>
                {
                    (pathname === '/account/' && user) && 
                    <CurrentUser />
                }
            </div>

            <div style={articleStyle}>
                <h4><span className='fw-bolder textShadowWhite dropShadow'><span style={{letterSpacing: '-0,5px'}}>M<span className='mitMaroon'>I</span>T</span> | xCHANGE</span> is for demo purposes only, <span id='doNot' className='mitMaroon'>DO NOT</span> use your real login credentials.</h4>
                <img src={cartoonMoney} alt='cartoon money' style={moneyStyle} className='imgHover' />

            </div>

            <Create />

            { !user ? (
                <LogIn />
            ) : (
                null
            )}

        </section>
    )
}