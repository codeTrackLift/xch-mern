import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTransaction, updateTransaction } from '../features/transactions/transactionSlice'
import { FaRegEdit, FaTimesCircle, FaSave, FaRegWindowClose } from 'react-icons/fa'

const updateButtonStyle = {
    border:'none',
    color:'cornflowerblue',
    backgroundColor:'transparent'
}

const saveButtonStyle = {
    border:'none',
    color:'cornflowerblue',
    backgroundColor:'transparent',
    marginInline:'1rem'
}

function TransactionItem({ transaction }) {
    const [value, setValue] = useState(transaction.value)
    const [showEditForm, setShowEditForm] = useState(false)

    const dispatch = useDispatch()

    const onUpdateTransaction = () => {
        if(value.trim() === '') return

        dispatch(updateTransaction({ id: transaction._id, value}))
    }

    const onDeleteTransaction = () => {
        dispatch(deleteTransaction(transaction._id))
    }
    
    return (
        <div className='transaction'>
            <div style={{color:'gray'}}>{new Date(transaction.createdAt).toLocaleString('en-US')}</div>

            { showEditForm ? (
                <form 
                    className='transaction-edit-form' 
                    onSubmit={e => e.preventDefault()}
                >
                    <div className='form-group'>
                        <input 
                            type='value'
                            name='value'
                            id='value'
                            placeholder='Enter transaction value'
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            style={{fontSize:'0.75rem',width:'90%'}}
                        />
                    </div>
                    <p style={{color:'gray'}}>Save?</p>
                    <button 
                        className='transaction-save-icon' 
                        type='button' 
                        onClick={onUpdateTransaction} 
                        style={saveButtonStyle}
                    >
                        <FaSave size={25} />
                    </button>
                    <button 
                        className='transaction-skip-save-icon' 
                        type='button' 
                        onClick={() => setShowEditForm(prevState => !prevState)} style={saveButtonStyle}
                    >
                        <FaTimesCircle size={25} />
                    </button>
                </form>
            ) : (
                <div className="transaction-value-wrapper">
                    <hr style={{marginInline:'1rem'}} />
                    <p style={{color:'lime'}}>{transaction.value}</p>
                    <button 
                        className='transaction-edit icon' 
                        style={updateButtonStyle}
                        onClick={() => setShowEditForm(prevState => !prevState)}
                    >
                        <FaRegEdit size={20}/> <span style={{color:'gray'}}>Update</span>
                    </button>
                </div>
            )}
            <button 
                className='close' 
                style={{margin:'-0.5rem',color:'cornflowerblue',}}  
                onClick={onDeleteTransaction}
            >
                <span style={{color:'gray'}}>Delete </span><FaRegWindowClose size={20}/>
            </button>
        </div>
    )
}

export default TransactionItem