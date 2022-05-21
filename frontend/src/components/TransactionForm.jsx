import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createTransaction } from '../features/transactions/transactionSlice'

function TransactionForm() {
    const [value, setValue] = useState('')

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createTransaction({ value }))
        setValue('')
    }

    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='value'>Transaction</label>
                    <input
                        type='number'
                        name='value'
                        id='value'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <button className='btn btn-block' type='submit'>
                        Add Transaction
                    </button>
                </div>
            </form>
        </section>
    )
}

export default TransactionForm