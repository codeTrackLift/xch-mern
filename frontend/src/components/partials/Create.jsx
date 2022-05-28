import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Spinner from './Spinner'

import { logout, register, reset } from '../../features/auth/authSlice'
import { capitalize } from '../helpers/capitalize'

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

export const Create = () => {
    const [showRegistration, setShowRegistration] = useState(true)
    const [showPass, setShowPass] = useState(false)
    const [showPass2, setShowPass2] = useState(false)
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
            toast.info(`You are logged in as ${capitalize(user.name)}`)
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
            setShowRegistration(false)
        }
    }

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
    }

    if (isLoading) {
        return <Spinner />
    }

    return (       
        <div className='card' style={accountCardStyle}>
            <div className='card-header text-center' style={cardHeaderStyle}>
                <h5 className='my-auto'>Create New Account</h5>
            </div>

            { (user && showRegistration) && 
                <div className='text-center'>
                    <h5 className='mt-3 mx-3'>Please log out to create another account.</h5>
                    <button 
                        id='createAnotherButton'
                        type='submit' 
                        className='btn my-3' 
                        onClick={() => onLogout()}
                    >Log Out</button>
                </div>
            }

            { (user && !showRegistration) &&
                <div className='text-center'>
                    <h5 className='mt-3 mx-3'>You are successfully logged into the xCHANGE!</h5>
                    <button 
                        id='createAnotherButton'
                        type='submit' 
                        className='btn my-3' 
                        onClick={()=>setShowRegistration(true)}
                    >Add another account</button>
                </div>
            }

            { ((!user && showRegistration) || (!user && isSuccess === false)) &&
                <section className='form'>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor='name' className='fw-bold mx-3 mt-2'>Name</label>
                            <input 
                                type="text" 
                                className="form-control mx-auto" 
                                id='name' 
                                name='name' 
                                value={name} 
                                placeholder='Enter your name' 
                                onChange={onChange} 
                                style={{width:'95%'}}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor='email' className='fw-bold mx-3 mt-2'>Email</label>
                            <input 
                                type="email" 
                                className="form-control mx-auto" 
                                id='email' 
                                name='email' 
                                value={email} 
                                placeholder='Enter your email' 
                                onChange={onChange} 
                                onBlur={onBlur}
                                style={{width:'95%'}}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor='password' className='fw-bold mx-3 mt-2'>
                                Password <span className='text-black fw-lighter fst-italic'>{ password && password.length < 8 && ' must be 8 characters'}</span>
                            </label>
                            <div style={passWrap}>
                                <input 
                                    type={showPass ? 'text' : 'password'} 
                                    className="form-control mx-auto" 
                                    id='password' 
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
                                        id='password2' 
                                        name='password2' 
                                        value={password2} 
                                        placeholder='Confirm your password' 
                                        onChange={onChange} 
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
                            <button id='createButton' type="submit" className='my-3 btn btn-block' disabled={
                                !name || !email || !password || isError
                            }>
                                Submit & Log In
                            </button>
                        </div>
                    </form>
                </section>
            }
        </div>
    )
}