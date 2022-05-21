import { useFormik} from 'formik';
import { LogInCard } from './AccountCards';

import { capitalize } from '../helpers/capitalize';

const errorStyle = {
    color: 'red'
}

export const LogIn = ({setUser, ctx}) => {

    const validate = values => {
        let errors = {};
        if (!values.emailLogIn) {
            errors.email = 'is required*';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
            .test(values.emailLogIn)) {
            errors.email = 'address is invalid*';
        }
        if (!getUser(values.emailLogIn)) {
            errors.email = 'address not found*';
        }
        if(!values.pswLogIn) {
            errors.password = 'is required*';
        } 
        return errors;
    }

    const getUser = (email) => {
        return ctx.users.find(user => user.email === email);
    }

    const formik = useFormik({
        initialValues: {
            emailLogIn: '',
            pswLogIn: ''
        },
        validate,
        onSubmit: (values, {resetForm}) => {
            const userLogIn = getUser(values.emailLogIn);
            const userName = capitalize(userLogIn.name);
            if (userLogIn.password === values.pswLogIn) {
                alert(`LOGGING IN\n\nWelcome back, ${userName}.\n\nAccount ${userLogIn.id} has been successfully loaded.  Your current balance is $${userLogIn.balance.toLocaleString(undefined, {'minimumFractionDigits':2,'maximumFractionDigits':2})}`);
                setUser(`${userName}, Account Number: ${userLogIn.id}`);
                resetForm();
                return;
            }
            alert(`Invalid password.`);
        }, 
    });

    return (
        <LogInCard 
            header={'Have an account?'}
            body={<form>
                <div>Email {formik.touched.emailLogIn && formik.errors.email ? (
                    <span id='emailErrorLogIn' style={errorStyle}>{formik.errors.email}</span>
                    ) : null}
                </div>
                <input 
                    id='emailLogIn' 
                    type='email' 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    value={formik.values.emailLogIn}
                    className='w-100'
                />
                <div>Password {formik.touched.pswLogIn && formik.errors.password ? (
                    <span id='pswErrorLogIn' style={errorStyle}>{formik.errors.password}</span> 
                    ): null}</div>
                <input 
                    id='pswLogIn' 
                    type='password' 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    value={formik.values.pswLogIn}
                    className='w-100'
                />
                <br/>
                <button 
                    id='logInButton'
                    type='submit' 
                    className='btn btn-light mt-4' 
                    onClick={formik.handleSubmit}
                    disabled={
                        !formik.values.emailLogIn &&
                        !formik.values.pswLogIn
                    }
                >Log In</button>
            </form>}
        />
    )
}