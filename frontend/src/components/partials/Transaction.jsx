import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Card, Row } from 'react-bootstrap';


import { createTransaction } from '../../features/transactions/transactionSlice'
import balance from '../helpers/balance'
import account from '../helpers/account'
import { capitalize } from '../helpers/capitalize'
import { balanceNumber } from '../helpers/balance';

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

export const Transaction = ({type}) => {
    const [value, setValue] = useState('')
    const [withdraw, setWithdraw] = useState('')
    const [overdraft, setOverdraft] = useState(false)
    const { user } = useSelector((state) => state.auth)
    const { transactions } = useSelector((state) => state.transactions)

    const [currentBalance, setCurrentBalance] = useState(balance({user, transactions}))
    const dispatch = useDispatch()

    useEffect(() => {
        setCurrentBalance(balance({user, transactions}))

        if(type === 'Withdraw' && balanceNumber({user, transactions}) - Number(value) < 0) {
            setOverdraft(true)
        } else {
            setOverdraft(false)
        }

    }, [user, transactions, value, withdraw, currentBalance])

    const onChange = (e) => {
        setValue(e.target.value.replace(/^0+/, '').replaceAll('-', ''))
        if(type === 'Withdraw') {
            setWithdraw(-Number(e.target.value))
        }
    }
    
    const onBlur = (e) => {
        setValue(e.target.value)
        if(isNaN(value)) {
            toast.error('Invalid amount')
        }
        if(e.target.value && e.target.value <= 0) {
            toast.error('Amount must be greater than $0')
            return
        }
        if(type === 'Deposit' && +e.target.value > 1000000) {
            toast.error('Exceeds maximum deposit amount of $1,000,000')
        }
    }

    const onDeposit = (e) => {
        e.preventDefault()
        if(e.target.value <= 0) {
            toast.error('Amount must be greater than $0')
            return
        }
        dispatch(createTransaction({ value }))
        toast.info('Deposit successful')
        setValue('')
    }
    
    const onWithdraw = (e) => {
        e.preventDefault()
        if(e.target.value <= 0) {
            toast.error('Amount must be greater than $0')
            return
        }
        let value = withdraw
        dispatch(createTransaction({ value }))
        toast.info('Withdraw successful')
        setValue('')
    }

    return (
        <div style={articleStyle}>
            <Card className='form card' style={cardStyle}>
                <Card.Header className='text-center' style={cardHeaderStyle}>
                    <Row className='fs-5'>
                        { user && <span className='col-sm-6'>User: {capitalize(user.name)}</span>}
                        <span className='col-sm-6'>Make a {type}</span>
                    </Row>
                </Card.Header>
                <Row>
                    <div className='col-sm-5 my-auto'>
                        <h5 className='mt-3'>
                        <div className='text-center'>
                            Account #: <span className='textGray fs-6'>{account({user})}</span><hr/>
                            { overdraft ? (
                                <span style={{color:'red'}}>Insufficient Balance: </span> 
                            ) : ( 
                                <span>Account Balance: </span>
                            )} <br/>
                            <span className='fs-6'>${currentBalance}</span>
                        </div>
                        </h5>
                    </div>
                    <form className='col-sm-7 text-center' onSubmit={
                        type === 'Deposit' ? onDeposit : onWithdraw
                    }>
                        <div className='form-group row mt-4'>
                            <label htmlFor='value' className='col-4 fw-bolder text-end'>Amount: </label>
                            <input
                                type='number'
                                name='value'
                                id='value'
                                step='0.01'
                                min={0}
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                className='my-auto col-7'
                                />
                        </div>
                        <div className="form-group">
                            <button id='transactionButton' className='btn btn-block my-3' type='submit' disabled={
                                !value || 
                                isNaN(value) || 
                                overdraft || 
                                value <= 0 || 
                                (value > 1000000 && type === 'Deposit')
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