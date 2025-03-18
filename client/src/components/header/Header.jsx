import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router';

// const navigation = [
//     { name: 'Начало', href: '/' },
//     { name: 'За нас', href: '/about-us' },
//     { name: 'Новини', href: '/news' },
//     { name: 'Обучение', href: '/education' },
//     { name: 'Календар', href: '/calendar' },
//     { name: 'Контакти', href: '/contact' },
// ]

const navigation = [
    { name: 'Начало', href: '/' },
    { name: 'За нас', href: '/about-us' },
    { name: 'Новини', href: '/news' },
    {
        name: 'Обучение',
        href: '/education',
        submenu: [
            { name: 'История', href: '/education/history' },
            { name: 'Теория', href: '/education/theory' },
            { name: 'Форми', href: '/education/forms' },
            { name: 'Терминология', href: '/education/terminology' },
            { name: 'Статий', href: '/education/articles' },
        ]
    },
    { name: 'Календар', href: '/calendar' },
    { name: 'Контакти', href: '/contact' },
]


import {
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
  } from '@headlessui/react'

  import { ChevronDownIcon } from '@heroicons/react/20/solid'

  

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


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
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((menu) => (

                        menu.submenu
                            ? <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                                <Popover className="relative">
                                    <PopoverButton className="flex items-center gap-x-0 text-sm/6 font-semibold text-slate-200">
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
                                                key={item.name}
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
                            </PopoverGroup>
                            : <Link key={menu.name} to={menu.href} className="text-sm/6 font-semibold text-slate-200">
                                {menu.name}
                            </Link>

                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link to="/login" className="text-sm/6 font-semibold text-slate-200">
                        Log in <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </nav>

            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link href="#" className="-m-1.5 p-1.5">
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
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="py-6">
                                <Link
                                    href="/login"
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









// padashato menu
// 1. obuchenie
//     - teoriq
//     - terminologiq
//     - isotriq na TKD
//     - formi
//     - statii
//     - 
// admin menu
// 1. novini
//  - seminari - add to calendar
//  - izpiti - add to calendar
//  - sustezanie - add to calendar
//  - general
 
// 2. klubove
//     - add/edit/delete


// 4. obuchenie - add,edit,delete

// 5. 