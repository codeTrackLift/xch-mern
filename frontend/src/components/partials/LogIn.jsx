import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { toast } from 'react-toastify'

import Spinner from './Spinner'
import { updatePassword, login, reset } from '../../features/auth/authSlice'

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

const passWrap = {
    display: "flex",
    position: "relative",
};

const eyeStyle = {
    position: "absolute",
    right: "1rem",
    top: ".5rem",
};

const forgotStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'black',
    marginTop: '-0.5rem',
    marginBottom: '0.5rem',
}

export const LogIn = () => {
    const [forgotPw, setForgotPw] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [showPass2, setShowPass2] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: '',
    })

    const { email, password, password2 } = formData
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        if(isError) {
            console.log(message);
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

    const onBlurForgot = (e) => {
        if (password && password.length < 8) {
            toast.error('Password must be at least 8 characters')
            return
        }
        if (password2 && password !== password2) {
            toast.error('Passwords do not match')
            return
        } 
    }

    const onUpdatePw = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password,
        }
        dispatch(updatePassword(userData))

        if(isSuccess) {
            setFormData({
                name: '',
                email: '',
                password: '',
                password2: '',
            })
            setForgotPw(false)
            toast.info('Password updated, please log in')
        }
    }

    if(isLoading) {
        return <Spinner />
    }

    return (
        <div className='card' style={accountCardStyle}>
            { !forgotPw ? (
                <>
                <div className='card-header text-center' style={cardHeaderStyle}>
                    <h5 className='my-auto'>Existing User Login</h5>
                </div>
                <section className='form'>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor='email' className='fw-bold mx-3 mt-2'>Email</label>
                            <input 
                                type="email" 
                                className="form-control mx-auto" 
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
                            <div style={passWrap}>
                                <input 
                                    type={showPass ? 'text' : 'password'}
                                    className="form-control mx-auto" 
                                    name='password' 
                                    value={password} 
                                    placeholder='Enter your password' 
                                    onChange={onChange} 
                                    style={{width:'95%'}}
                                />
                                <i style={eyeStyle} onClick={() => setShowPass(!showPass)}>
                                    { showPass ? <FaEye /> : <FaEyeSlash /> }
                                </i>
                            </div>
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
                <button style={forgotStyle}
                    onClick={() => setForgotPw(true)}>Forgot your password?
                </button>
                </>
            ) : (
                <>
                <div className='card-header text-center' style={cardHeaderStyle}>
                    <h5 className='my-auto' style={{color:'red'}}>Password Reset Form</h5>
                </div>
                <section className='form'>
                    <form onSubmit={onUpdatePw}>
                        <div className="form-group">
                            <label htmlFor='email' className='fw-bold mx-3 mt-2'>Email</label>
                            <input 
                                type="email" 
                                className="form-control mx-auto" 
                                name='email' 
                                value={email} 
                                placeholder='Enter your email' 
                                onChange={onChange} 
                                onBlur={onBlurForgot}
                                style={{width:'95%'}}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor='password' className='fw-bold mx-3 mt-2 mitMaroon'>
                                New Password<span className='text-black fw-lighter fst-italic'>{ password && password.length < 8 && ' must be 8 characters'}</span>
                            </label>
                            <div style={passWrap}>
                                <input 
                                    type={showPass ? 'text' : 'password'}
                                    className="form-control mx-auto" 
                                    name='password' 
                                    value={password} 
                                    placeholder='Enter your password' 
                                    onChange={onChange} 
                                    style={{width:'95%'}}
                                />
                                <i style={eyeStyle} onClick={() => setShowPass(!showPass)}>
                                    { showPass ? <FaEye /> : <FaEyeSlash /> }
                                </i>
                            </div>
                        </div>
                        { password.length >= 8 ? (
                            <div className="form-group">
                            <label htmlFor='password2' className='fw-bold mx-3 mt-2 mitMaroon'>
                                Confirm Password<span className='text-black fw-lighter fst-italic'>{ password2 && password !== password2 && ' must match'}</span>
                            </label>
                                <div style={passWrap}>
                                    <input 
                                        type={showPass2 ? 'text' : 'password'} 
                                        className="form-control mx-auto" 
                                        name='password2' 
                                        value={password2} 
                                        placeholder='Confirm your password' 
                                        onChange={onChange} 
                                        onBlur={onBlurForgot}
                                        style={{width:'95%'}}
                                    />
                                    <i className='mitMaroon' style={eyeStyle} onClick={() => setShowPass2(!showPass2)}>
                                        { showPass2 ? <FaEye /> : <FaEyeSlash /> }
                                    </i>
                                </div>
                            </div>
                        ) : (
                            null
                        )}
                        <div className="form-group text-center">
                            <button id='logInButton' type="submit" className='my-3 btn btn-block' disabled={
                                !email || !password || isError || password.length < 8 || password !== password2
                            }>
                                Update Password
                            </button>
                            <button id='transactionButton' className='btn btn-block mb-3'
                                onClick={() => setForgotPw(false)}>Cancel password reset
                            </button>
                        </div>
                    </form>
                </section>
                </>
            )}
        </div>
    )
}