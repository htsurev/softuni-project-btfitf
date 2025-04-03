import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import usePersistedState from './hooks/usePersistedState'
import AuthGuard from './components/guards/AuthGuard'

import Home from './components/home/Home'
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
import AdminProfile from './components/admin/admin-profile/AdminProfile'
import AdminProfileEdit from './components/admin/admin-profile/AdminProfileEdit'
import AdminNewsEdit from './components/admin/admin-news/AdminNewsEdit'
import NewsDetails from './components/news/NewsDetails'
import ClubDetails from './components/clubs/ClubDetails'
import GuestGuard from './components/guards/GuestGuard'
import Education from './components/education/Education'
import Store from './components/store/Store'
import AdminProfiles from './components/admin/admin-profiles/AdminProfiles'
import AdminStore from './components/admin/admin-store/AdminStore'
import AdminStoreAddNewItem from './components/admin/admin-store/AdminStoreAddNewItem'
import AdminStoreItemEdit from './components/admin/admin-store/AdminStoreItemEdit'
import StoreItemDetails from './components/store/StoreItemDetails'

function App() {
    const [authData, setAuthData] = usePersistedState('auth', {});
    const isLogged = authData.email;
    const location = useLocation();

    const userLoginHandler = (resultData) => {
        setAuthData(resultData);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const userLogoutHandler = () => {
        setAuthData({});
    }

    return (
        <UserContext.Provider value={{ ...authData, userLoginHandler, userLogoutHandler }}>

            <div className="flex flex-col min-h-screen">
                <Header />

                <main className="flex-grow p-0 flex mt-16">

                    {isLogged && <AdminMenu />}

                    {/* Main content */}
                    <div className={`flex-grow ${isLogged ? 'lg:w-3/4' : 'w-full'} mt-9`}>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/contact' element={<Contact />} />
                            <Route path='/news' element={<News />} />
                            <Route path='/news/:newsId/details' element={<NewsDetails />} />
                            <Route path='/education' element={<Education />} />
                            <Route path='/education/history' element={<History />} />
                            <Route path='/education/terminology' element={<Terminology />} />
                            <Route path='/education/theory' element={<Theory />} />
                            <Route path='/about-us' element={<AboutUs />} />
                            <Route path='/store' element={<Store />} />
                            <Route path='/store/:itemId/details' element={<StoreItemDetails />} />
                            <Route path='/clubs' element={<Clubs />} />
                            <Route path='/club/:clubId/details' element={<ClubDetails />} />
                            <Route path='/*' element={<NotFound />} />

                            <Route element={<GuestGuard />}>
                                <Route path='/login' element={<Login onLogin={userLoginHandler} />} />
                                <Route path='/register' element={<Register />} />
                            </Route>

                            <Route element={<AuthGuard />}>
                                <Route path='/admin/profile' element={<AdminProfile />} />
                                <Route path='/admin/profile/edit' element={<AdminProfileEdit />} />
                                <Route path='/admin/clubs' element={<AdminClubs />} />
                                <Route path='/admin/news' element={<AdminNews />} />
                                <Route path='/admin/news/create' element={<AdminNewsAddNew />} />
                                <Route path='/admin/news/:newsId/edit' element={<AdminNewsEdit />} />
                                <Route path='/admin/clubs/create' element={<AdminClubsAddNew />} />
                                <Route path='/admin/clubs/:clubId/edit' element={<AdminClubsEdit />} />
                                <Route path='/admin/profiles' element={<AdminProfiles />} />
                                <Route path='/admin/store' element={<AdminStore />} />
                                <Route path='/admin/store/create' element={<AdminStoreAddNewItem />} />
                                <Route path='/admin/store/:itemId/edit' element={<AdminStoreItemEdit />} />
                                <Route path='/logout' element={<Logout />} />
                            </Route>

                        </Routes>
                    </div>
                </main>


                <Footer />
            </div>
        </UserContext.Provider>
    );

}

export default App
