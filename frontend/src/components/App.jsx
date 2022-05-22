import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { MyNavbar } from './MyNavbar';
import { Header } from './Header';
import { Home } from '../pages/Home';
import { CreateAccount } from '../pages/Account';
import { Deposit } from '../pages/Deposit';
import { Withdraw } from '../pages/Withdraw';
import { UserData } from '../pages/UserData';
import { Footer } from './Footer';

export const App = () => {
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
            <ToastContainer />
            
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