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

export const Transaction = ({ctx, user, type}) => {

    const getUser = () => {
        const id = user.split(', Account Number: ')[1];
        return ctx.users.find(e => e.id === Number(id));
    }

    const validate = values => {
        let errors = {};
        const balance = getUser().balance;
        if(!values.valueField || values.valueField < 0.01) {
            errors.value = 'is invalid*';
        } 
        if(values.valueField < 0) {
            errors.value = 'cannot be negative*'
        } 
        if(isNaN(values.valueField) && values.valueField !== '-') {
            errors.value = 'is not a number*'
        } 
        if(type === 'Withdraw' &&
            values.valueField > balance) {
            errors.value = 'insufficient balance*'
        }
        return errors;
    }

    const formik = useFormik({
        initialValues: {
            valueField: '',
            noteField: '',
        },
        validate,
        onSubmit: (values, {resetForm}) => {
            const transactionDate = newDate()
            const userObject = getUser();
            let newBalance = null;
            if (type === 'Deposit') {
                newBalance = Number(userObject.balance) + Number(values.valueField);
            }
            if (type === 'Withdraw') {
                newBalance = Number(userObject.balance) - Number(values.valueField);
            }
            if (newBalance == '-0.00') {
                newBalance = 0;
            }
            userObject.balance = newBalance;
            userObject.transactions.push([transactionDate, type, values.valueField, values.noteField]);
            if (type === 'Deposit') {
                alert(`DEPOSIT SUCCESSFUL\n\n$${Number(values.valueField).toLocaleString(undefined, {'minimumFractionDigits':2,'maximumFractionDigits':2})} has been deposited to\nAccount: ${userObject.id}\nNew Balance: $${userObject.balance.toLocaleString(undefined, {'minimumFractionDigits':2,'maximumFractionDigits':2})}\n\nThanks for your business, ${capitalize(userObject.name)}. Please visit again!`);
            }
            if (type === 'Withdraw') {
                alert(`WITHDRAWAL SUCCESSFUL\n\n$${Number(values.valueField).toLocaleString(undefined, {'minimumFractionDigits':2,'maximumFractionDigits':2})} has been withdrawn from\nAccount: ${userObject.id}\nNew Balance: $${userObject.balance.toLocaleString(undefined, {'minimumFractionDigits':2,'maximumFractionDigits':2})}\n\nThanks for your business, ${capitalize(userObject.name)}. Please visit again!`);
            }
            resetForm();
        }, 
    });

    return (
        <section style={articleStyle}>
            { !user ? (
                <Card style={cardStyle}>
                    <Card.Header style={cardHeaderStyle}>
                        <Row>
                            You are not logged in
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            Please log in to access your xCHANGE banking account.
                        </Row>
                    </Card.Body>
                </Card>
            ) : (
                <Card style={cardStyle}>
                    <Card.Header style={cardHeaderStyle}>
                        <Row>
                            <div className='col-sm-6 py-1'>
                                <span className='fw-bolder'>Account: </span>{user.split(', Account Number: ')[1]}
                            </div>
                            <div className='col-sm-6 py-1'>
                                <span className='fw-bolder'>Balance: $</span>{getUser().balance.toLocaleString(undefined, {'minimumFractionDigits':2,'maximumFractionDigits':2})}
                            </div>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <form>
                        <Row>
                            <div className='col-sm-6'>
                                <p><span className='fw-bolder'>{type} Amount: </span> {formik.touched.valueField && formik.errors.value ? (
                                    <span id='valueError' style={errorStyle}>{formik.errors.value}</span>
                                ) : null}</p>
                                <input 
                                    id='valueField' 
                                    type='text' 
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur}
                                    value={formik.values.valueField}
                                    className='w-100'
                                />
                            </div>
                            <div className='col-sm-6'>
                                <div>
                                    <p><span className='fw-bolder'>Note: </span></p>
                                    <textarea 
                                        id='noteField' 
                                        type='text' 
                                        onChange={formik.handleChange} 
                                        onBlur={formik.handleBlur}
                                        value={formik.values.noteField}
                                        className='w-100'
                                        style={textAreaStyle}
                                    />
                                </div>
                            </div>
                            
                            <button 
                                id='transactionButton'
                                type='submit' 
                                className='btn mt-4' 
                                onClick={formik.handleSubmit}
                                disabled={
                                    !formik.values.valueField ||
                                    formik.errors.value !== undefined
                                }
                            >{type}</button>
                        </Row>
                        </form>
                    </Card.Body>
                </Card>
            )}

        </section>
    )
}