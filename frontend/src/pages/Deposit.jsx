import React from 'react'
import { Row } from 'react-bootstrap'

import { Transaction } from '../components/partials/Transaction';
import { initScrollMagicTransaction } from '../components/helpers/scrollMagic';

import wallet from '../images/wallet.png'

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

export const Deposit = ({ctx, user}) => {

    const clearHomeActive = () => {
        const home = document.getElementById('homeNavLink');
        home.classList.remove('active');
    }
    setTimeout(clearHomeActive, 50);

    setTimeout(initScrollMagicTransaction, 50);

    return (
        <section style={sectionStyle}>
            <Row style={articleStyle} className='text-center'>
                <img id='transactionImage' className='col-6 img-fluid m-auto dropShadow' src={wallet} alt='cash deposit' style={imageStyle}/>
                <h2 id='transactionText' className='col-6 m-auto'>Deposit</h2>
            </Row>
            <Transaction 
                ctx={ctx}
                user={user}
                type='Deposit'
            />

        </section>
    )
}