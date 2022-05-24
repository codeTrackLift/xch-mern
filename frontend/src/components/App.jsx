import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
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
    const [title, setTitle] = useState('MIT xCHANGE | MERN Bank');

    const ScrollToTop = () => {
        const { pathname } = useLocation();

        useEffect(() => {

            if(pathname.includes('/account')) {
                window.scrollTo(0, 850);
                return
            }

            if(pathname.includes('/deposit') ||
                pathname.includes('/withdraw') ||
                pathname.includes('/userdata')) {
                window.scrollTo(0, 650);
                return
            }

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
            
            <MyNavbar setTitle={setTitle} />

            <Header setTitle={setTitle} />

            <ScrollToTop />

            <Routes>
                <Route path="/*" element={<Home setTitle={setTitle} />} />
                <Route path="/account" element={<CreateAccount />} />
                <Route path="/deposit" element={<Deposit/>} />
                <Route path="/withdraw" element={<Withdraw/>} />
                <Route path="/userdata" element={<UserData/>} />
            </Routes>
            <Footer />

        </div>
    );
}