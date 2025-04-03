import { createContext } from "react";
// import { useLocation } from "react-router";
// import usePersistedState from "../hooks/usePersistedState";

export const UserContext = createContext({
    _id: '',
    email: '',
    fullname: '',
    accessToken: '',
    userLoginHandler: () => null,
    userLogoutHandler: () => null,
});

// export function UserProvider({
//     children,
// }) {
//     const [authData, setAuthData] = usePersistedState('auth', {});
//     const isLogged = authData.email;
//     const location = useLocation();

//     const userLoginHandler = (resultData) => {
//         setAuthData(resultData);
//     }

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, [location]);

//     const userLogoutHandler = () => {
//         setAuthData({});
//     }

//     return (
//         <UserContext.Provider value={{ ...authData, userLoginHandler, userLogoutHandler, isLogged }}>
//             {children}
//         </UserContext.Provider>
//     );


// }