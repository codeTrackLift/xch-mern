import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header_old'
import Dashboard from './pages/Dashboard_old'
import Login from './pages/Login_old'
import Register from './pages/Register_old'
import { Footer } from './components/Footer_old'

function App() {
    return (
        <>
            <Router>
                <div className='container'>
                    <Header />
                    <Routes>
                        <Route path='/' element={<Dashboard />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
