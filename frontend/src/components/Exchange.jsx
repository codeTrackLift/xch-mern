import { useState } from 'react';
import { Spinner } from 'react-bootstrap';

import { Calculator } from './partials/Calculator';
import { Data } from './partials/Data';
import { newTime } from './helpers/dateTime';
import { initScroll } from './helpers/initScroll';

import '../styles/exchange.css';

const Rates = ({data}) => {
    const rates = Object.keys(data).map(function(key, i) {
        return (
            <p key={i}>
                <span className='fw-bolder text-white textShadow dropShadow'>{data[key].name}</span>
                <br/>
                <span className='fw-bolder'>{data[key].unit} </span>
                <span className='cornflowerBlue textShadow'>
                    {data[key].value.toLocaleString(undefined, {'minimumFractionDigits':2,'maximumFractionDigits':2})}
                </span>
            </p>
            )
        }
    )

    return (
        <>
            <span>{rates}</span>
        </>
    );
}

const Time = () => {
    const [time, setTime] = useState(newTime);
    return <span>{time.toLocaleString()} </span>;
}

const loadingStyle = {
    paddingBlock: '3rem',
    backgroundColor: 'gainsboro',
}

const tickerStyle = {
    backgroundColor: 'gainsboro',
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
    borderBottom: '10px solid cornflowerblue',
}

export const Exchange = () => {
    const [scrolling, setScrolling] = useState(false);
    const data = Data();

    if (data && !scrolling) {
        setScrolling(true)
        setTimeout(initScroll, 500);
    }
    
    return (
        <>{data ? (
            <div style={tickerStyle}>
                <p className='text-center'>
                    <span className='textShadowWhite dropShadow px-1'>xCHANGE</span><span> rates (BTC1) updated </span>
                    <Time/>
                    <span>courtesy of </span>
                    <a href='https://www.coingecko.com/' target='_blank' rel='noreferrer'>CoinGecko</a>.
                </p>
                <div id='exchangeRates'>
                    <Rates data={data} />
                </div>
                <Calculator data={data} />
            </div>
        ) : (
            <div className='text-center' style={tickerStyle}>
                <span>Fetching from </span>
                <a href='https://www.coingecko.com/' target='_blank' rel='noreferrer'>CoinGecko</a> 
                <span> API: </span>
                <Time/>
                <span>-- Please wait...</span>
                <div id='loading' className='fs-1' style={loadingStyle}>
                    <Spinner animation="border" role="status" className='mx-3'/>
                    <span className='textShadowWhite dropShadow px-1'>xCHANGING</span>
                    <span> data</span>
                </div>
            </div>
        )}</>
    );
}