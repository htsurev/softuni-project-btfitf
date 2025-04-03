import { useActionState, useContext, useState } from "react";
import { useLogin } from "../../api/authApi";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";

export default function Login() {
    const navigate = useNavigate();
    const { userLoginHandler } = useContext(UserContext);
    const [showLoginError, setShowLoginError] = useState(false);

    const { login } = useLogin();

    const loginHandler = async (_, formData) => {
        try {
            const values = Object.fromEntries(formData);

            const authData = await login(values.email, values.password);

            userLoginHandler(authData);
            setShowLoginError(false);

            navigate('/admin/profile');
            return;
        } catch (error) {
            setShowLoginError("Потребителското име или паролата не съвпадат");
            console.error("Login failed:", error);

            return { error: true };
        }
    };    

    const [_, loginFormAction, isPending] = useActionState(loginHandler, { email: '', password: '' });

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src="https://itfbulgaria.com/wp-content/uploads/2022/04/logo-btf_414_77.png"
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Влезте във вашия акаунт
                </h2>
                {showLoginError && 
                    <p className="text-center text-xs text-rose-600 mt-3">{showLoginError}</p>
                }
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action={loginFormAction}>
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
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                Парола
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Забравена парола?
                                </a>
                            </div>
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
                    </div>

                    <div>
                        <button type="submit" disabled={isPending} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >
                            Влез
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Напревете нова{` `}
                    <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Регистрация
                    </Link>
                </p>
            </div>
        </div>
    );
}