import { useEffect } from 'react'
import { Button, Card, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import TransactionForm from '../components/TransactionForm'
import TransactionItem from '../components/TransactionItem'
import Spinner from '../components/partials/Spinner'
import { getTransactions } from '../features/transactions/transactionSlice'
import { deleteUser, logout, reset } from '../features/auth/authSlice'
import account from '../components/helpers/account'
import balance from '../components/helpers/balance'
import localeString from '../components/helpers/localeString'


import { capitalize } from '../components/helpers/capitalize';

const sectionStyle = {
    margin: '0 auto',
    maxWidth: '960px',
}

const deleteStyle = {
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
    zIndex: 10,
}

const greetingStyle = {
    margin: '2rem auto 0 auto',
    width: '960px',
    maxWidth: '90vw',
}

const cardHeaderStyle = {
    backgroundColor: 'rgb(50,50,50)',
    margin: '0rem -0.55rem',
    color: 'white',
    textShadow: '1px 1px 1px black',
}

const cardStyle ={
    margin: '2rem auto',
    padding: '0 0.5rem',
    maxWidth: '90vw',
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
}

export const UserData = () => {
    const { user, isError, message } = useSelector((state) => state.auth)
    const { transactions, isLoading } = useSelector((state) => state.transactions)
    const dispatch = useDispatch()

    const clearHomeActive = () => {
        const home = document.getElementById('homeNavLink');
        home.classList.remove('active');
    }
    setTimeout(clearHomeActive, 50);

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

    }, [user, isError, message])

    useEffect(() => {
        dispatch(getTransactions())

        return () => {
            dispatch(reset())
        }
    }, [dispatch])

    const onDeleteUser = () => {
        dispatch(deleteUser(user._id))
        dispatch(logout())
        dispatch(reset())
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <section style={sectionStyle}>

            <div style={greetingStyle} className='mb-5'>
                <h6 className='text-center'><span className='fw-bolder textShadowWhite dropShadow px-1'><span style={{letterSpacing: '-0,5px'}}>M<span className='mitMaroon'>I</span>T</span> | xCHANGE</span> believes in <span className='fw-bolder textShadowWhite dropShadow px-1'>xCHANGING</span> everything... <span className='textSilver'>(including user data)</span></h6>  
            </div>

            { user ? ( 
                <Card style={cardStyle}>
                    <Card.Header style={cardHeaderStyle} className='row'>
                        <div className='col-sm-6 mt-2'>
                            <h5>User Name: <span className='fs-5 fw-normal'>{capitalize(user.name)}</span></h5>
                        </div>
                        <div className='col-sm-6 mt-2'>
                            <h5>Email: <span className='fs-5 fw-normal'>{user.email}</span></h5>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <div className='col-sm-6 mt-2'>
                                <h5>Account: <span className='fs-5 fw-normal'>{account({user})}</span></h5>
                            </div>
                            <div className='col-sm-6 mt-2'>
                                <h5>Balance: $<span className='fs-5 fw-normal'>{localeString(balance({user, transactions}))}</span></h5>
                            </div>
                        </Row>
                        <button onClick={onDeleteUser} id='transactionButton'>Delete User</button> 
                        <hr />
                        { transactions.length > 0 ? (
                            <div className='transactions'>
                                {transactions.map((transaction) => {
                                    return <TransactionItem key={transaction._id} transaction={transaction} />
                                })}
                            </div>
                        ) : ( 
                            <h3 style={{color:'silver'}}>You have no transactions</h3>
                        )}
                    </Card.Body>
                </Card>
            ) : (
                <Card style={cardStyle}>
                    <Card.Header className='text-center' style={cardHeaderStyle}>
                        <h5>Unauthorized User</h5>
                    </Card.Header>
                    <h5 className='my-3 text-center'>Please log in to view user data</h5>
                </Card>
            )}

        </section>
    )
}