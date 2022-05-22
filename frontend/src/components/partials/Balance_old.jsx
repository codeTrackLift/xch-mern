import { useSelector } from 'react-redux'

function Balance () {

    const { user } = useSelector((state) => state.auth)
    const { transactions, isLoading, isError, message } = useSelector((state) => state.transactions)

    let balance = 0;
    transactions.map((transaction) => {
        balance += Number(transaction.value);
    })

    // const account = user._id.replace(/\D/g,'').substring(0,8);

    return (
        <div className='text-center'>
            {/* Account: {account} <hr/> */}
            Balance: ${balance}
        </div>
    )
}

export default Balance