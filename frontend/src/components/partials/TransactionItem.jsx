import localeString from '../helpers/localeString'

function TransactionItem({ transaction }) {
    return (
        <div className='transaction my-3 row'>
            <span className='col-sm-5' style={{color:'gray'}}>{new Date(transaction.createdAt).toLocaleString('en-US')}</span>
            <span className="col-sm-7 transaction-value-wrapper fw-bolder">
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