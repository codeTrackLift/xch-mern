import { useEffect, useState } from 'react'
import { Card, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { FaUserCheck, FaUserCog, FaUserShield } from 'react-icons/fa'

import TransactionItem from '../components/partials/TransactionItem'
import { getTransactions } from '../features/transactions/transactionSlice'
import { deleteUser, logout, reset } from '../features/auth/authSlice'

import account from '../components/helpers/account'
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
    fontVariant: 'small-caps',
}

const cardStyle ={
    margin: '2rem auto',
    padding: '0 0.5rem',
    maxWidth: '90vw',
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
}

export const UserData = () => {
    const [confirmDelete, setConfirmDelete] = useState(false)
    const { user, isError, message } = useSelector((state) => state.auth)
    const { transactions } = useSelector((state) => state.transactions)
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
        window.location.reload(false)
    }

    const onConfirm = () => {
        setConfirmDelete(true)
    }

    return (
        <section style={sectionStyle}>

            <div style={greetingStyle} className='mb-5'>
                <h2 className='text-center my-5'><i className='px-2'><FaUserCog /></i>User Data<i className='px-2'><FaUserShield /></i></h2>
                <h5 className='text-center'><span className='fw-bolder textShadowWhite dropShadow px-1'><span style={{letterSpacing: '-0,5px'}}>M<span className='mitMaroon'>I</span>T</span> | xCHANGE</span> MERN Bank is secured with <i><FaUserCheck /></i> JSON Web Tokens.</h5>  
            </div>

            { user ? ( 
                <Card style={cardStyle}>
                    <Card.Header style={cardHeaderStyle} className='row'>
                        <div className='col-sm-6 mt-2'>
                            <h5>User Name: <span className='fs-5 fw-normal' style={{fontVariant:'normal'}}>{capitalize(user.name)}</span></h5>
                        </div>
                        <div className='col-sm-6 mt-2'>
                            <h5>Email: <span className='fs-5 fw-normal' style={{fontVariant:'normal'}}>{user.email}</span></h5>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <div className='col-sm-6 mt-2'>
                                <h5>Account #: <span className='fs-6 fw-normal'>{account({user})}</span></h5>
                            </div>
                            <div className='col-sm-6 mt-2'>
                                <h5>Current Balance: $<span className='fs-5 fw-normal'>{localeString(user.balance)}</span></h5>
                            </div>
                        </Row>
                        { confirmDelete ? (
                            <div className='text-center'>
                                <button className='btn mt-4 mx-5' onClick={() => setConfirmDelete(false)} id='createButton' style={deleteStyle}>Cancel</button> 
                                <button className='btn mt-4 mx-5' onClick={onDeleteUser} id='transactionButton' style={deleteStyle}>Confirm</button> 
                                <p><span className='fw-bolder mitMaroon'>CONFIRM DELETE</span><br/>Deleting a user is permanent!</p>
                            </div>
                        ) : (
                            <div className='text-center'>
                                <button className='btn mt-4' onClick={onConfirm} id='transactionButton' style={deleteStyle}>Delete User</button> 
                                <p>Cannot undo!</p>
                            </div>
                        )}
                        
                        <hr />
                        <h5 className='textGray text-center'>Transaction History (Newest to Oldest)</h5>
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
                        <h5 className='my-auto'>View User Data</h5>
                    </Card.Header>
                    <h5 className='my-3 text-center'><b className='px-1 mitMaroon'>Unauthorized User:</b> Please log in to view user data.</h5>
                </Card>
            )}

        </section>
    )
}