import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-[#011222] sticky top-0 z-10 shadow-md shadow-[#011222]">
            <div className=" px-4">
                <div className="flex justify-between h-16">

                    {/* default navbar  */}
                    <div className='flex'>
                        <div className="flex-shrink-0 flex items-center justify-center">
                            <span className="text-white font-semibold text-xl">Blogger</span>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:justify-center items-center">
                            <div className="text-white px-3 py-2 rounded-md text-md font-medium hover:bg-gray-700"><Link to='/' >Home</Link></div>
                            <div className="text-white px-3 py-2 rounded-md text-md font-medium hover:bg-gray-700">About</div>
                            <div className="text-white px-3 py-2 rounded-md text-md font-medium hover:bg-gray-700">Services</div>
                            <div className="text-white px-3 py-2 rounded-md text-md font-medium hover:bg-gray-700">Contact</div>
                        </div>
                    </div>


                    <div className='text-center flex justify-center items-center spacx-2 md:space-x-6   '>
                        <Link to='/blogpost' className='text-white px-3 py-2 rounded-md text-md font-medium hover:bg-gray-700'>Blogs</Link>
                        <Link to='/user'>
                            <img className='w-8 h-8 mx-3 hidden sm:block' src='https://cdn-icons-png.flaticon.com/128/3177/3177440.png' alt='#'></img>
                        </Link>
                    </div>

                    {/* toggle button  */}
                    <div className="-mr-2 flex items-center sm:hidden">
                        <Link to='/user'>
                            <img className='w-8 h-8 mx-3 sm:hidden' src='https://cdn-icons-png.flaticon.com/128/3177/3177440.png' alt='#'></img>
                        </Link>
                        <button onClick={toggleMenu} className="text-white inline-flex items-center justify-center p-2 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
                            <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* small desktop view*/}
            <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <div className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Home</div>
                    <div className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">About</div>
                    <div className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Services</div>
                    <div className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Contact</div>
                </div>
            </div>
        </nav>
    );
};
