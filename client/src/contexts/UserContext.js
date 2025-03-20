import { createContext } from "react";

export const UserContext = createContext({
    _id: '',
    email: '',
    fullname: '',
    accessToken: '',
    userLoginHandler: () => null,
    userLogoutHandler: () => null,
});