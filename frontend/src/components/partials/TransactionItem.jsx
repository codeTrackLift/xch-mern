import localeString from '../helpers/localeString'

function TransactionItem({ transaction }) {
    return (
        <div className='transaction my-3'>
            <span style={{color:'gray'}}>{new Date(transaction.createdAt).toLocaleString('en-US')}</span>
            <span className="transaction-value-wrapper px-4 fw-bolder">
                    { transaction.value > 0 ?
                        <>
                        <span className='cornflowerBlue'>Deposit Amount: </span><span className='fw-bold'>${localeString(transaction.value)}</span>
                        </>
                        :
                        <>
                        <span className='mitMaroon'>Withdrawal Amount: </span><span className='fw-bold'>{String(localeString(transaction.value)).replace('-','-$')}</span>
                        </>
                    } 
            </span>
        </div>
    )
}

export default TransactionItem