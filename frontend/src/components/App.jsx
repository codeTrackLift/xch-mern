import { useContext, useEffect, useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import { MyNavbar } from './MyNavbar';
import { Header } from './Header';
import { Home } from '../pages/Home';
import { CreateAccount } from '../pages/Account';
import { Deposit } from '../pages/Deposit';
import { Withdraw } from '../pages/Withdraw';
import { UserData } from '../pages/UserData';
import { Footer } from './Footer';

export const App = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    
    const [title, setTitle] = useState('Home | MIT xCHANGE Bank');

    const ScrollToTop = () => {
        const { pathname } = useLocation();
        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);
        return null;
    }

    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <div>
            <MyNavbar />

            <Header 
                setTitle={setTitle}
            />

            <ScrollToTop />

            <Routes>
                <Route path="/*" element={<Home />} />
                <Route path="/account" 
                        element={<CreateAccount 
                        user={user}
                        // setUser={setUser}
                    />} 
                />
                <Route path="/deposit" 
                        element={<Deposit
                        user={user}
                    />} 
                />
                <Route path="/withdraw" 
                        element={<Withdraw
                        user={user}
                    />} 
                />
                <Route path="/userdata" 
                        element={<UserData
                        // setUser={setUser}
                    />} 
                 />
            </Routes>
            <Footer />

        </div>
    );
}