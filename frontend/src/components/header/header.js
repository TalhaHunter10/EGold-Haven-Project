import './header.css';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Badge } from "@material-tailwind/react";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import ListIcon from '@mui/icons-material/List';
import Logout from '@mui/icons-material/Logout';
import ChatIcon from '@mui/icons-material/Chat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { getUserData, getloginStatus, logoutUser } from '../../services/authservice';
import { useDispatch } from 'react-redux';
import { SET_LOGIN, SET_NAME, SET_STATUS, selectName, selectStatus } from '../../redux/features/auth/authSlice';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { useEffect , useState } from 'react';
import { ChatState } from '../chat/ChatProvider';



export function BadgeDefault() {
    return (
        <Badge content="5" color='yellow' className='ml-9 p-1 bg-yellow-700 rounded-full' >
            <img src="/images/notificationicon.png" alt="Notification" className="user-icon notification-icon ml-5 w-7 cursor-pointer" />
        </Badge>
    );
}



function NavList() {
    return (
        <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 alluse">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <Link to={"/"} className="flex items-center hover:text-yellow-600 transition-colors">
                    Home
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <Link to={"/searchlistings"} className="flex items-center hover:text-yellow-600 transition-colors">
                    Listings
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <Link to={"/products"} className="flex items-center hover:text-yellow-600 transition-colors">
                    Products
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <Link to="/forum" className="flex items-center hover:text-yellow-600 transition-colors">
                    Forum
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <Link to="/forum" className="flex items-center hover:text-yellow-600 transition-colors">
                    FAQ's
                </Link>
            </Typography>
        </ul>
    );
}



const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userName = useSelector(selectName)
    const [isLoggedIn , setIsLoggedIn] = useState(useSelector(selectIsLoggedIn));

    const [openNav, setOpenNav] = React.useState(false);

    const logout = async () => {
        await logoutUser();
        dispatch(SET_LOGIN(false))
        dispatch(SET_NAME(""))
        dispatch(SET_STATUS("user"))
        navigate('/login')
        setAnchorEl(null);
    };

    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);


    React.useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const [userstatus, setUserStatus] = React.useState(useSelector(selectStatus));

  useEffect(() => {
    const checkLoginStatus = async () => {
        try {
            const status = await getloginStatus();
            if (status.verified) {
                setIsLoggedIn(true);
                const user = await getUserData();
                if(user.status === 'jeweler'){
                    
                setUserStatus(user.status);
                }
                else{
                    setUserStatus('user')
                }
            }
            else{
                dispatch(SET_LOGIN(false))
                dispatch(SET_NAME(""))
                dispatch(SET_STATUS("user"))
                setIsLoggedIn(false)
            }
        } catch (error) {
            console.error('Error checking login status:', error);
        }
    };

    checkLoginStatus();
}, [dispatch, navigate]);

const {setChatType} = ChatState();

    const goToChat = () => {
        localStorage.setItem('chatType', 'user');
        setChatType('user')
        navigate('/chat')
    }


    return (
        <header className="header">


            <Link to='/'><img src='/images/EGHLogo.png' alt='logo' className='weblogo  md:h-22.5 md:w-64 cursor-pointer' ></img></Link>
            
            <Navbar className="ml-auto max-w-screen-xl px-6 py-3 bg-transparent border-0 w-32 text-stone-200 nb z-50">
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
                <Link to='/'>
                    <button className="nav-button text-lg ml-5 hidden lg:block">
                        Home
                    </button>
                </Link>
                <Link to='/searchlistings'>
                    <button className="nav-button text-lg ml-5 hidden lg:block">
                        Listings
                    </button>
                </Link>
                <Link to='/products'>
                    <button className="nav-button text-lg ml-5 hidden lg:block">
                        Products
                    </button>
                </Link>
                <Link to='/forum'>
                    <button className="nav-button text-lg ml-5 hidden lg:block">
                        Forum
                    </button>
                </Link>
                <Link to='/faq'>
                    <button className="nav-button text-lg ml-5 hidden lg:block">
                        FAQ's
                    </button>
                </Link>
                {isLoggedIn ? (

                    <div className="user-icons">
                        <BadgeDefault />

                        <span className='user-icon flex items-center ml-5 md:ml-0'>
                            <img src="/images/usericon.png" alt="User" className="ml-5 w-10 cursor-pointer" onClick={handleClick} />
                            <img src="/images/arrowdownicon.png" alt="arrowdown" className="arrowdown-icon w-2 cursor-pointer" onClick={handleClick} />
                        </span>
                    </div>
                ) : (
                    <Link to='/login'>
                        <button className="nav-button ml-5 text-lg">
                            Login
                        </button>
                    </Link>
                )}
            </div>


            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        backgroundColor: '#4b4e49',
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        color: 'white',


                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                            color: '#d2ac47',
                            backgroundColor: '#4b4e49'
                        },

                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Link to="/userprofile"><MenuItem onClick={handleClose}>
                    <Avatar />
                    <span className='headerbodytext'> My Profile ({userName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}) </span>
                </MenuItem></Link>
               <Link to="/mylistings"> <MenuItem onClick={handleClose}>
                    <ListIcon style={{
                        width: 24,
                        height: 24,
                        marginRight: 12,
                        color: '#d2ac47',
                        backgroundColor: '#4b4e49'
                    }} /> <span className='headerbodytext'> My Listings </span>
                </MenuItem></Link>
                <Link to="/favoritelistings"><MenuItem onClick={handleClose}>
                    <FavoriteBorderIcon style={{
                        width: 22,
                        height: 22,
                        marginLeft: 2,
                        marginRight: 12,
                        color: '#d2ac47',
                        backgroundColor: '#4b4e49'
                    }} /> <span className='headerbodytext'>My Favorites </span>
                </MenuItem></Link>
               <span onClick={goToChat}><MenuItem onClick={handleClose}>
                    <ChatIcon style={{
                        width: 20,
                        height: 20,
                        marginLeft: 3,
                        marginRight: 14,
                        color: '#d2ac47',
                        backgroundColor: '#4b4e49'
                    }} /> <span className='headerbodytext'> Chat </span>
                </MenuItem></span>
                {userstatus === 'jeweler' ? <Link to="/storepage"><MenuItem onClick={handleClose}>
                
                    <img className="h-6 w-6 mr-3" src='/images/shop.png' alt='user' />
                    <span className='headerbodytext'>Manage Store</span>
                </MenuItem></Link> : null}

                <Divider />
                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <Logout fontSize="small" style={{
                            width: 20,
                            height: 20,
                            marginLeft: 4,
                            marginRight: 12,
                            color: '#d2ac47',
                            backgroundColor: '#4b4e49'
                        }} />
                    </ListItemIcon>
                    <span className='headerbodytext'> Logout </span>
                </MenuItem>
            </Menu>

        </header>
    );
}

export default Header;