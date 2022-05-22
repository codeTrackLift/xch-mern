import React from 'react'
import { Card, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'

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

const cardHeaderStyle = {
    backgroundColor: 'rgb(50,50,50)',
    margin: '0rem -0.55rem',
    padding: '0.5rem 1.5rem',
    color: 'white',
    textShadow: '1px 1px 1px black',
    fontVariant: 'small-caps',
}

const cardStyle ={
    margin: '2rem auto',
    padding: '0 0.5rem',
    maxWidth: '90vw',
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
}

export const Withdraw = () => {
    const { user } = useSelector((state) => state.auth)

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
            
            { user ? (
                <Transaction type='Withdraw' />
            ) : (
                <Card style={cardStyle}>
                    <Card.Header className='text-center' style={cardHeaderStyle}>
                        <h5>Make a Withdrawal</h5>
                    </Card.Header>
                    <h5 className='my-3 text-center'><b className='px-1 mitMaroon'>Unauthorized User: </b>Please log in make a transaction</h5>
                </Card>
            )}

        </section>
    )
}