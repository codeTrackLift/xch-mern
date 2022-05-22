import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { createTransaction } from '../../features/transactions/transactionSlice'

import { useFormik} from 'formik';
import { Card, Row, Toast } from 'react-bootstrap';

import Balance from './Balance'
import balance from '../helpers/balance'
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

export const Transaction = ({type}) => {
    const [value, setValue] = useState('')
    const [withdraw, setWithdraw] = useState('')
    const [overdraft, setOverdraft] = useState(false)
    const { user } = useSelector((state) => state.auth)
    const { transactions, isError, message } = useSelector((state) => state.transactions)

    const account = user._id.replace(/\D/g,'').substring(0,8);
    const [currentBalance, setCurrentBalance] = useState(balance({user, transactions}))
    const dispatch = useDispatch()

    useEffect(() => {
        setCurrentBalance(balance({user, transactions}))

        if(type === 'Withdraw' && (currentBalance - Number(value) < 0)) {
            setOverdraft(true)
        } else {
            setOverdraft(false)
        }

    }, [user, transactions, value, withdraw])

    const onChange = (e) => {
        setValue(e.target.value)
        if(e.target.value <= 0) {
            toast.error('Amount must be greater than 0')
        }
    }
    
    const onBlur = (e) => {
        // setWithdraw(e.target.value)
        if(isNaN(value)) {
            toast.error('Amount must be a number')
        }
    }

    const onDeposit = (e) => {
        e.preventDefault()
        dispatch(createTransaction({ value }))
        setValue('')
    }

    const onWithdraw = (e) => {
        e.preventDefault()
        setWithdraw(-Number(value))
        console.log(value, typeof value)
        dispatch(createTransaction({ value }))
        setValue('')
    }

    return (
        <div style={articleStyle}>
            <Card className='form card' style={cardStyle}>
                <Card.Header className='text-center' style={cardHeaderStyle}>
                    <h5>Make a {type}</h5>
                </Card.Header>
                <Row>
                    <div className='col-sm-4 my-auto'>
                        <h5 className='mt-3'>
                        <div className='text-center'>
                            Account: {account} <hr/>
                            { overdraft ? (
                                <span style={{color:'red'}}>Insufficient Balance: </span> 
                            ) : ( 
                                <span>Account Balance: </span>
                            )} <br/>
                            ${currentBalance}
                        </div>
                        </h5>
                    </div>
                    <form className='col-sm-8 text-center' onSubmit={
                        type === 'Deposit' ? onDeposit : onWithdraw
                    }>
                        <div className='form-group row mt-3'>
                            <label htmlFor='value' className='col-4 fw-bolder text-end'>Amount: </label>
                            <input
                                type='number'
                                name='value'
                                id='value'
                                min={0}
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                className='my-auto col-7'
                                />
                        </div>
                        <div className="form-group">
                            <button id='transactionButton' className='btn btn-block my-3' type='submit' disabled={
                                !value || isNaN(value) || overdraft || value <= 0
                            }>
                                {type}
                            </button>
                        </div>
                    </form>
                </Row>
            </Card>
        </div>
    )
}