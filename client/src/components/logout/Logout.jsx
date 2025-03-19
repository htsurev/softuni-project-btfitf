import { Navigate } from "react-router";
import { useLogout } from "../../api/authApi";

export default function Logout() {
    const { isLoggedout } = useLogout();

    return isLoggedout
        ? <Navigate to="/" />
        : null;
}