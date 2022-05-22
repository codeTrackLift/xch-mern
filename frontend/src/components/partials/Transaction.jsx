import React from 'react'
import { useFormik} from 'formik';
import { Card, Row } from 'react-bootstrap';

import { newDate } from '../helpers/dateTime';
import { capitalize } from '../helpers/capitalize';

const articleStyle = {
    margin: '0 auto',
    padding: '0 0.5rem',
    maxWidth: '960px',
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

const errorStyle = {
    color: 'red'
}

const textAreaStyle = {
    resize: 'none',
}

export const Transaction = () => {

   

    return (
        <section style={articleStyle}>
          
        </section>
    )
}