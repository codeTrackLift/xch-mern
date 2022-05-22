import transactionService from '../features/transactions/transactionService'
import localeString from './helpers/localeString'

function TransactionItem({ transaction }) {
    return (
        <div className='transaction'>
            <div style={{color:'gray'}}>{new Date(transaction.createdAt).toLocaleString('en-US')}</div>
            <div className="transaction-value-wrapper">
                <p>
                    { transaction.value > 0 ?
                        <span>Deposit </span> :
                        <span>Withdrawal </span>
                    }
                    Amount: ${localeString(transaction.value)}
                </p>
            </div>
        </div>
    )
}

export default TransactionItem