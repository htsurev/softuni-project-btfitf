import { Route, Routes, useLocation } from 'react-router'
import { useEffect, useState } from 'react'

import Home from './components/Home/Home'
import Login from './components/login/Login'
import Footer from './components/Footer/Footer'
import Contact from './components/Contact/Contact'
import Header from './components/Header/Header'
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

function App() {

    // const currentUrl = window.location.href;
    // console.log(currentUrl);

    const [showRightMenu, setShowRightMenu] = useState(true);

    const location = useLocation(); // Hook to get the current location

    // Scroll to top whenever the location changes (i.e., when the route changes)
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top of the page
    }, [location]); // This effect will run every time the location changes

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow p-0 bg-gray-100 flex mt-16">
                {/* Conditionally render right menu */}
                {showRightMenu && (
                    <AdminMenu />
                )}

                {/* Main content */}
                <div className={`flex-grow ${showRightMenu ? 'lg:w-3/4' : 'w-full'} mt-9`}>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/contact' element={<Contact />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/news' element={<News />} />
                        <Route path='/about-us' element={<AboutUs />} />
                        <Route path='/clubs' element={<Clubs />} />
                        <Route path='/*' element={<NotFound />} />

                        {/* ADMIN PAGES */}
                        <Route path='/admin/clubs' element={<AdminClubs />} />
                        <Route path='/admin/clubs/create' element={<AdminClubsAddNew />} />
                        <Route path='/admin/clubs/:clubId/edit' element={<AdminClubsEdit />} />
                        <Route path='/education/history' element={<History />} />
                        <Route path='/education/terminology' element={<Terminology />} />
                    </Routes>
                </div>
            </main>

            <Footer />
        </div>
    );

}

export default App
