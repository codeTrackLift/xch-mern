import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Spinner from '../Spinner'

import { register, reset } from '../../features/auth/authSlice'
import { capitalize } from '../helpers/capitalize'

export const Create = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    const { name, email, password, password2 } = formData

    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {

        if(isError) {
            toast.error(message)
        }

        if(isSuccess && user) {
            toast.info(`Welcome to the xCHANGE ${capitalize(user.name)}`)
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onBlur = (e) => {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        .test(email)) {
            toast.error('Invalid email address')
            return
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (isError) {
            toast.error(message)
            return
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        .test(email)) {
            toast.error('Invalid email address')
            return
        }
        if (password.length < 8) {
            toast.error('Password must be at least 8 characters')
            return
        }
        if (password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                name, 
                email, 
                password,
            }

            dispatch(register(userData))
            
            setFormData({
                name: '',
                email: '',
                password: '',
                password2: '',
            })
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    const accountCardStyle = {
        margin: '3rem auto',
        width: '20rem',
        maxWidth: '90vw',
        border: '1px solid black',
        borderRadius: '2px',
        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
    }

    const cardHeaderStyle = {
        margin: '-0.05rem -0.05rem 0 -0.05rem',
        backgroundColor: 'rgb(50,50,50)',
        color: 'white',
        textShadow: '1px 1px 1px black',
        fontVariant: 'small-caps',
    }

    return (       
        <div className='card' style={accountCardStyle}>
            <div className='card-header' style={cardHeaderStyle}>Create an Account</div>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            id='name' 
                            name='name' 
                            value={name} 
                            placeholder='Enter your name' 
                            onChange={onChange} 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="email" 
                            className="form-control" 
                            id='email' 
                            name='email' 
                            value={email} 
                            placeholder='Enter your email' 
                            onChange={onChange} 
                            onBlur={onBlur}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            className="form-control" 
                            id='password' 
                            name='password' 
                            value={password} 
                            placeholder='Enter your password' 
                            onChange={onChange} 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            className="form-control" 
                            id='password2' 
                            name='password2' 
                            value={password2} 
                            placeholder='Confirm your password' 
                            onChange={onChange} 
                        />
                    </div>
                    <div className="form-group text-center">
                        <button id='createButton' type="submit" className='my-3 btn btn-block' disabled={
                            !name || !email || !password || !password2 || isError
                        }>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}