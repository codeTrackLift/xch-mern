import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import Spinner from './Spinner'
import { login, reset } from '../../features/auth/authSlice'

export const LogIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError) {
            console.log(message);
        }

        if(isSuccess || user) {

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

        const userData = {
            email,
            password,
        }

        dispatch(login(userData))
    }

    if(isLoading) {
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
        <div className='card-header text-center' style={cardHeaderStyle}>
            <h5 className='my-auto'>Log in Form</h5>
        </div>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor='email' className='fw-bold mx-3 mt-2'>Email</label>
                        <input 
                            type="email" 
                            className="form-control mx-auto" 
                            // id='email' 
                            name='email' 
                            value={email} 
                            placeholder='Enter your email' 
                            onChange={onChange} 
                            onBlur={onBlur}
                            style={{width:'95%'}}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor='password' className='fw-bold mx-3 mt-2'>Password</label>
                        <input 
                            type="password" 
                            className="form-control mx-auto" 
                            // id='password' 
                            name='password' 
                            value={password} 
                            placeholder='Enter your password' 
                            onChange={onChange} 
                            style={{width:'95%'}}
                        />
                    </div>
                    <div className="form-group text-center">
                        <button id='logInButton' type="submit" className='my-3 btn btn-block' disabled={
                            !email || !password || isError
                        }>
                            Log In
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}