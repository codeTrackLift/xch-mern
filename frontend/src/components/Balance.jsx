import { useSelector } from 'react-redux'

function Balance () {

    const { user } = useSelector((state) => state.auth)
    const { transactions, isLoading, isError, message } = useSelector((state) => state.transactions)

    let balance = 0;
    transactions.map((transaction) => {
        balance += Number(transaction.value);
    })

    return (
        <div>
            Balance: {balance}
        </div>
    )
}

export default Balance