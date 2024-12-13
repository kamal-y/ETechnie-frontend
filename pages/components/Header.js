import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();



    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsLoggedIn(false);

            return;
        }
        setIsLoggedIn(true)

    }, [router]);

    const handleLogOut = () => {
        // Remove token from localStorage
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.push('/');
        toast.success('Logged out successfully');
    };

    return (
        <header class='flex shadow-lg py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50'>
            <div class='flex flex-wrap items-center justify-between gap-4 w-full'>


                <div id="collapseMenu"
                    class='max-lg:hidden lg:!block max-lg:w-full max-lg:fixed max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50'>


                    <ul
                        class='lg:flex lg:gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>

                        <li class='max-lg:border-b max-lg:py-3 px-3'>
                            <a href='/'
                                class='hover:text-[#007bff] text-[#007bff] block font-semibold text-[15px]'>Home</a>
                        </li>
                    </ul>
                </div>

                <div class='flex items-center ml-auto space-x-6'>
                    {
                        !isLoggedIn ? (
                            <Link href="/user/login" passHref>
                                <div className="font-semibold text-[15px] text-[#007bff] hover:underline">Log in</div>
                            </Link>
                        ) : (
                            <button
                                onClick={handleLogOut}
                                className="font-semibold text-[15px] border-none outline-none text-[#007bff] hover:underline"
                            >
                                Log out
                            </button>
                        )
                    }
                    {
                        !isLoggedIn && (
                            <Link href="/user/signup" passHref>
                                <div className="px-4 py-2 text-sm rounded-sm font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:text-[#007bff] hover:bg-white hover:border-[#007bff]">
                                    Sign Up
                                </div>
                            </Link>
                        )
                    }

                    <button id="toggleOpen" class='lg:hidden'>
                        <svg class="w-7 h-7" fill="#333" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header