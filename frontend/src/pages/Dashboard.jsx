import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import TransactionForm from '../components/TransactionForm'
import TransactionItem from '../components/TransactionItem'
import Spinner from '../components/Spinner'
import { getTransactions, reset } from '../features/transactions/transactionSlice'
import capitalize from '../utils/capitalize'
import Balance from '../components/Balance'

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

    if (isLoading) {
        return <Spinner />
    }

    return <>
        <section className="heading">
            <h1><span style={{color:'silver'}}>Welcome</span> {user && capitalize(user.name)}</h1>
            <p>Transactions Dashboard</p>
            <Balance />
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