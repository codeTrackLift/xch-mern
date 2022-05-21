import { Button } from 'react-bootstrap';
import { capitalize } from '../helpers/capitalize';
import '../../styles/account.css'

const guestStyle = {
    borderRadius: '2px',
    color: '#990033',
    backgroundColor: 'transparent',
    borderColor: '#990033',
}

export const GuestLogIn = ({setUser, ctx}) => {

    const getUser = (email) => {
        return ctx.users.find(user => user.email === email);
    }

    const guestUser = () => {
        const userLogIn = getUser('email@domain.com');
        const userName = capitalize(userLogIn.name);
        alert(`QUICK LOG IN AS GUEST USER\n\nWelcome, ${userName}.\n\nAccount ${userLogIn.id} has been successfully loaded.  Your current balance is $${userLogIn.balance.toLocaleString(undefined, {'minimumFractionDigits':2,'maximumFractionDigits':2})}`);
        setUser(`${userName}, Account Number: ${userLogIn.id}`);
    }

    return (
       <div className='text-center'>
           <h5 className='fst-italic textGray'>Too busy to create an account?</h5>
           <Button id='quickLogIn' style={guestStyle} onClick={guestUser}>Quick Login</Button>
       </div>
    )
}