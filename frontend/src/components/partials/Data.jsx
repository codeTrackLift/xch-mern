import { useEffect, useState } from 'react';
import axios from 'axios';

export const Data = () => {
const [data, setData] = useState();

    useEffect(() => {
        setTimeout(getData, 1000);
    }, []);

    const getData = () => {
        axios.get('https://api.coingecko.com/api/v3/exchange_rates').then((response) => {
            console.log(response.data.rates);
            setData(response.data.rates);
        }).catch((error) => {
            console.log(error);
        });
    }
    
    return data;
}