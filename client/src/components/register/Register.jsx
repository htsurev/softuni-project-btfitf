import { Link, useNavigate } from "react-router";
import { useRegister } from "../../api/authApi";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function Register() {
    const navigate = useNavigate();
    const { register } = useRegister();
    const { userLoginHandler } = useContext(UserContext);
    const [showRegisterError, setShowRegisterError] = useState(false);

    const registerHandler = async (formData) => {
        try {
            const { email, password } = Object.fromEntries(formData);

            const confirmPasswor = formData.get("confirm-password");

            if (password !== confirmPasswor) {
                setShowRegisterError("Паролите не съвпадат!");
                return;
            }
            setShowRegisterError(false);
            const authData = await register(email, password);

            userLoginHandler(authData);

            navigate('/admin/profile/edit');
        } catch (error) {
            setShowRegisterError("Вече съществува потребител със същия имейл");
            console.error("Login failed:", error);

            return { error: true };
        }

    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src="https://itfbulgaria.com/wp-content/uploads/2022/04/logo-btf_414_77.png"
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Регистрация
                </h2>
                {showRegisterError && 
                    <p className="text-center text-xs text-rose-600 mt-3">{showRegisterError}</p>
                }
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action={registerHandler}>
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            E-mail
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="example@domain.com"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                Парола
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>

                        <div className="flex items-center justify-between mt-5">
                            <label htmlFor="confirm-password" className="block text-sm/6 font-medium text-gray-900">
                                Повтори парола
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >
                            Регистрация
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Имате Регистрация? {` `}
                    <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Влез
                    </Link>
                </p>
            </div>
        </div>
    );
}