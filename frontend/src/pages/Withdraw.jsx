import React from 'react'
import { Row } from 'react-bootstrap'

import { Transaction } from '../components/partials/Transaction';
import { initScrollMagicTransaction } from '../components/helpers/scrollMagic';

import cashAtm from '../images/cashAtm.png'

import '../styles/transaction.css'

const sectionStyle = {
    marginInline: 'auto',
    maxWidth: '1400px',
}

const articleStyle = {
    margin: '0 auto',
    padding: '0 0.5rem',
    maxWidth: '960px',
}

const imageStyle = {
    width: '30vw',
    maxWidth: '10rem',
}

export const Withdraw = ({ctx, user}) => {

    const clearHomeActive = () => {
        const home = document.getElementById('homeNavLink');
        home.classList.remove('active');
    }
    setTimeout(clearHomeActive, 50);

    setTimeout(initScrollMagicTransaction, 50);

    return (
        <section style={sectionStyle}>
            <Row style={articleStyle} className='text-center'>
                <img id='transactionImage' className='col-6 img-fluid mx-auto dropShadow' src={cashAtm} alt='cash deposit' style={imageStyle}/>
                <h2 id='transactionText' className='col-6 m-auto'>Withdraw</h2>
            </Row>
            <Transaction 
                ctx={ctx}
                user={user}
                type='Withdraw'
            />

        </section>
    )
}