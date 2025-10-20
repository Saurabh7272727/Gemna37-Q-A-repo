import React, { useState } from 'react'
import { AiOutlineBars } from "react-icons/ai";
import { useLocation, useNavigate } from 'react-router-dom';
import { Dialog, DialogPanel } from '@headlessui/react';
import { ImCross } from "react-icons/im";
import Cookies from 'js-cookie';
const Header = () => {
    const locationData = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navi = useNavigate();
    const { pathname } = locationData;
    const navigation = [
        { name: 'Product', href: '#' },
        { name: 'Features', href: '#' },
        { name: 'Marketplace', href: '#' },
        { name: 'Company', href: '#' },
    ]

    const redirectThePage = ({ name }) => {
        navi(`/${name}`);
    }
    return (
        <div className='w-screen h-[60px] bg-gray-900 fixed top-0 flex justify-center
         gap-x-20 items-center z-30
        '>
            <nav className='md:w-[70%] w-[100%] md:h-[80%] h-full bg-gray-900 text-white md:rounded-lg
            flex md:justify-around items-center justify-between md:px-0 px-4
            '>
                <h1 onClick={() => navi('/landing')} className='text-white cursor-pointer font-medium bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg'>Gemna.ai</h1>
                <button onClick={() => setMobileMenuOpen(true)}><AiOutlineBars className='w-[60px] h-[30px] text-white cursor-pointer' /></button>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <h1 className='text-white font-medium bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg'>Gemna.ai</h1>
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-200"
                        >
                            <span className="sr-only">Close menu</span>
                            <ImCross aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-white/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <button
                                        onClick={() => {
                                            setMobileMenuOpen(false);
                                            redirectThePage(item);
                                        }}
                                        key={item.name}
                                        href={item.href}
                                        className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5  ${item.name === pathname.slice(1, pathname.length) ? "ring-2 ring-black bg-gray-500 px-3 rounded-sm" : ""}`}
                                    >
                                        {item.name}
                                    </button>
                                ))}
                            </div>
                            <div className="py-6" onClick={() => {
                                setMobileMenuOpen(false);
                                localStorage.clear();
                                Cookies.remove("GASID");
                                Cookies.remove("ErrorMessage");
                                window.location.reload();
                            }}>
                                <button
                                    className="-mx-3 block rounded-lg px-6 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5 bg-red-500"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </div>
    )
}

export { Header };

