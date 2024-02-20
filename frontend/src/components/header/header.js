import './header.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Badge } from "@material-tailwind/react";

export function BadgeDefault() {
    return (
        <Badge content="5" color='yellow' className='ml-10 p-1 bg-yellow-700 rounded-full' >
            <img src="/images/notificationicon.png" alt="Notification" className="notification-icon ml-5 w-8 cursor-pointer" />
        </Badge>
    );
}



function NavList() {
    return (
        <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <a href="#" className="flex items-center hover:text-yellow-600 transition-colors">
                    About Us
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <a href="#" className="flex items-center hover:text-yellow-600 transition-colors">
                    Forum
                </a>
            </Typography>
        </ul>
    );
}



const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [openNav, setOpenNav] = React.useState(false);

    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);

    const handleLogoClick = () => {

        window.location.href = './App.jsx';
    };

    React.useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return (
        <header className="header">


            <img src='/images/EGHLogo.png' alt='logo' className='weblogo  md:h-22.5 md:w-64 cursor-pointer' onClick={handleLogoClick}></img>

            <Navbar className="ml-auto max-w-screen-xl px-6 py-3 bg-transparent border-0 w-32 text-stone-200 nb">
                <div className="flex justify-between text-blue-gray-900 bg-transparent">
                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <XMarkIcon className="h-10 w-10" strokeWidth={2} />
                        ) : (
                            <Bars3Icon className="h-10 w-10" strokeWidth={2} />
                        )}
                    </IconButton>
                </div>
                <Collapse open={openNav}>
                    <NavList />
                </Collapse>
            </Navbar>
            <div className="nav-container">
            <Link to='/about'>
                <button className="nav-button ml-5 hidden lg:block">
                    About Us
                </button>
                </Link>
                <Link to='/forum'>
                <button className="nav-button ml-5 hidden lg:block">
                    Forum
                </button>
                </Link>
                {isLoggedIn ? (

                    <div className="user-icons">
                        <BadgeDefault />

                        <img src="/images/usericon.png" alt="User" className="user-icon ml-5 w-10 cursor-pointer" />
                        <img src="/images/arrowdownicon.png" alt="arrowdown" className="arrowdown-icon ml-0 w-3 cursor-pointer" />

                    </div>
                ) : (
                    <Link to='/login'>
                    <button className="nav-button ml-5">
                        Login
                    </button>
                    </Link>
                )}
            </div>

        </header>
    );
}

export default Header;