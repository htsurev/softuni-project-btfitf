import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Home from './components/Home/Home'
import Login from './components/login/Login'
import Footer from './components/footer/Footer'
import Contact from './components/Contact/Contact'
import Header from './components/header/Header'
import News from './components/news/News'
import AboutUs from './components/about-us/AboutUs'
import Clubs from './components/clubs/Clubs'

import './App.css'
import NotFound from './components/notFound/NotFound';
import AdminMenu from './components/admin/admin-menu/AdminMenu'
import Terminology from './components/education/Terminology'
import History from './components/education/History'
import AdminClubsAddNew from './components/admin/admin-clubs/AdminClubsAddNew'
import AdminClubs from './components/admin/admin-clubs/AdminClubs'
import AdminClubsEdit from './components/admin/admin-clubs/AdminClubsEdit'
import Theory from './components/education/Theory'
import AdminNews from './components/admin/admin-news/AdminNews'
import AdminNewsAddNew from './components/admin/admin-news/AdminNewsAddNew'
import { UserContext } from './contexts/UserContext'
import Register from './components/register/Register'
import Logout from './components/logout/Logout'

function App() {
    // const currentUrl = window.location.href;
    // console.log(currentUrl);

    const [authData, setAuthData] = useState({});

    const userLoginHandler = (resultData) => {

        setAuthData(resultData);
    }

    const [showRightMenu, setShowRightMenu] = useState(true);

    const location = useLocation();

    // Scroll to top whenever the location changes (i.e., when the route changes)
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top of the page
    }, [location]); // This effect will run every time the location changes

    const userLogoutHandler = () => {
        setAuthData({});
    }

    return (
        <UserContext.Provider value={{ ...authData, userLoginHandler, userLogoutHandler }}>

            <div className="flex flex-col min-h-screen">
                <Header />

                <main className="flex-grow p-0  flex mt-16">
                    {/* Conditionally render right menu */}
                    {showRightMenu && (
                        <AdminMenu />
                    )}

                    {/* Main content */}
                    <div className={`flex-grow ${showRightMenu ? 'lg:w-3/4' : 'w-full'} mt-9`}>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/contact' element={<Contact />} />
                            <Route path='/news' element={<News />} />
                            <Route path='/about-us' element={<AboutUs />} />
                            <Route path='/clubs' element={<Clubs />} />
                            <Route path='/login' element={<Login onLogin={userLoginHandler} />} />
                            <Route path='/logout' element={<Logout />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/*' element={<NotFound />} />

                            {/* ADMIN PAGES */}
                            <Route path='/admin/clubs' element={<AdminClubs />} />
                            <Route path='/admin/news' element={<AdminNews />} />
                            <Route path='/admin/news/create' element={<AdminNewsAddNew />} />
                            <Route path='/admin/clubs/create' element={<AdminClubsAddNew />} />
                            <Route path='/admin/clubs/:clubId/edit' element={<AdminClubsEdit />} />
                            <Route path='/education/history' element={<History />} />
                            <Route path='/education/terminology' element={<Terminology />} />
                            <Route path='/education/theory' element={<Theory />} />
                        </Routes>
                    </div>
                </main>

                <Footer />
            </div>
        </UserContext.Provider>
    );

}

export default App
