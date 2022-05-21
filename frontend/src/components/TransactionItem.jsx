function TransactionItem({ transaction }) {
    return (
        <div className='transaction'>
            <div style={{color:'gray'}}>{new Date(transaction.createdAt).toLocaleString('en-US')}</div>
            <div className="transaction-value-wrapper">
                <p style={{color:'lime'}}>{transaction.value}</p>
            </div>
        </div>
    )
}

export default TransactionItem