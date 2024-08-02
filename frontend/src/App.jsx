import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar.jsx';
import Home from './pages/Home.jsx';
import Jobs from './pages/Jobs.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import PostApplication from './pages/PostApplication.jsx';
import NoMatch from './pages/NoMatch.jsx';
import Footer from './components/Footer.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './slices/user.slice.js';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <>
      <Router>
        <Navbar />

        <main className='container py-4'>
          <div className='row'>
            <div className='col-md-12'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/jobs' element={<Jobs />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route
                  path='/post/application/:jobId'
                  element={<PostApplication />}
                />
                <Route path='*' element={<NoMatch />} />
              </Routes>
            </div>
          </div>
        </main>

        <Footer />
        <ToastContainer position='top-right' theme='dark' />
      </Router>
    </>
  );
}

export default App;
