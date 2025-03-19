import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { UserContext } from '../../contexts/UserContext';

import {
    Popover,
    PopoverButton,
    PopoverPanel,
} from '@headlessui/react'


const navigation = [
    { id: 1, name: 'Начало', href: '/' },
    { id: 2, name: 'За нас', href: '/about-us' },
    { id: 3, name: 'Новини', href: '/news' },
    {
        id: 4,
        name: 'Обучение',
        href: '/education',
        submenu: [
            { id: 41, name: 'История', href: '/education/history' },
            { id: 42, name: 'Теория', href: '/education/theory' },
            { id: 43, name: 'Форми', href: '/education/forms' },
            { id: 44, name: 'Терминология', href: '/education/terminology' },
            { id: 45, name: 'Статии', href: '/education/articles' },
        ]
    },
    { id: 5, name: 'Календар', href: '/calendar' },
    { id: 6, name: 'Контакти', href: '/contact' },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const closeMenu = () => {
        setMobileMenuOpen(false);
    };

    const { email } = useContext(UserContext);


    return (
        <header className="bg-gray-700 fixed top-0 left-0 w-full z-10 shadow-lg">
            <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8 py-5">
                <div className="flex lg:flex-1">
                    <Link to="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img
                            alt=""
                            src="https://itfbulgaria.com/wp-content/uploads/2022/04/logo-btf_414_77.png"
                            className="h-15 w-auto"
                        />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-200"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-3">
                    {navigation.map((menu) => (

                        menu.submenu
                            ? <Popover key={menu.id} className="relative">
                                <PopoverButton className="flex items-center gap-x-0 text-sm/6 font-semibold text-slate-200 border border-gray-700 rounded-lg px-3 py-1 hover:bg-gray-600 transition duration-500">
                                    {menu.name}
                                    <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
                                </PopoverButton>

                                <PopoverPanel
                                    transition
                                    className="absolute top-full -left-32 z-10 mt-3 w-screen max-w-xs overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in text-center"
                                >
                                    <div className="p-4">
                                        {menu.submenu.map((item) => (
                                            <div
                                                key={item.id}
                                                className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                                            >
                                                <div className="flex-auto">
                                                    <Link to={item.href} className="block font-semibold text-gray-900">
                                                        {item.name}
                                                        <span className="absolute inset-0" />
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </PopoverPanel>
                            </Popover>
                            : <Link key={menu.id} to={menu.href} className="text-sm/6 font-semibold text-slate-200 border border-gray-700 rounded-lg px-3 py-1 hover:bg-gray-600 transition duration-500">
                                {menu.name}
                            </Link>

                    ))}
                </div>

                {email
                    ? (
                        <div className="hidden lg:flex lg:flex-1 lg:justify-end ">
                            <Link to="/logout" className="text-sm/6 font-semibold text-slate-200 ">
                                Log out <span aria-hidden="true">&larr;</span>
                            </Link>
                        </div>
                    )
                    : (
                        <div className="hidden lg:flex lg:flex-1 lg:justify-end ">
                            <Link to="/login" className="text-sm/6 font-semibold text-slate-200 ">
                                Log in <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </div>
                    )
                }



            </nav>

            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                alt=""
                                src="https://itfbulgaria.com/wp-content/uploads/2022/02/btf-bg.png"
                                className="h-15 w-auto"
                            />
                        </Link>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    item.submenu
                                        ? (
                                            <Popover key={item.id} className="relative right-3">
                                                <PopoverButton className="flex items-center gap-x-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 w-full">
                                                    {item.name}
                                                    <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
                                                </PopoverButton>

                                                <PopoverPanel
                                                    transition
                                                    className="absolute top-full -left-0 z-10 mt-3 w-screen max-w-xs overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in text-center"
                                                >
                                                    <div className="p-4">
                                                        {item.submenu.map((subItem) => (
                                                            <div
                                                                key={subItem.id}
                                                                className="group relative justify-items-start gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                                                            >
                                                                <div className="flex-auto">
                                                                    <Link to={subItem.href} onClick={closeMenu} className="block font-semibold text-gray-900">
                                                                        {subItem.name}
                                                                        <span className="absolute inset-0" />
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </PopoverPanel>
                                            </Popover>
                                        )
                                        : (
                                            <Link
                                                key={item.id}
                                                to={item.href}
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 w-full"
                                                onClick={closeMenu}
                                            >
                                                {item.name}
                                            </Link>
                                        )
                                ))}

                            </div>
                            <div className="py-6">
                                <Link
                                    to="/login"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                >
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
}