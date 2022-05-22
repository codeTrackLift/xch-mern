import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import TransactionForm from '../components/TransactionForm'
import TransactionItem from '../components/TransactionItem'
import Spinner from '../components/partials/Spinner'
import { getTransactions } from '../features/transactions/transactionSlice'
import { deleteUser, logout, reset } from '../features/auth/authSlice'
import capitalize from '../utils/capitalize'
import Balance from '../components/partials/Balance_old'

function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { transactions, isLoading, isError, message } = useSelector((state) => state.transactions)

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!user) {
            navigate('/login')
        }
    }, [user, navigate, isError, message])

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
        navigate('/')
    }

    if (isLoading) {
        return <Spinner />
    }

    return <>
        <section className="heading">
            <h1><span style={{color:'silver'}}>Welcome</span> {user && capitalize(user.name)}</h1>
            <p>Transactions Dashboard</p>
            {user ? (<div>
                <Balance />
            </div>) : null}
            <button onClick={onDeleteUser}>Delete User</button>
        </section>

        <TransactionForm />

        <section className="content">
            { transactions.length > 0 ? (
                <div className='transactions'>
                    {transactions.map((transaction) => {
                        return <TransactionItem key={transaction._id} transaction={transaction} />
                    })}
                </div>
            ) : ( 
                <h3 style={{color:'silver'}}>You have no transactions</h3>
            )}
        </section>
    </>
}

export default Dashboard