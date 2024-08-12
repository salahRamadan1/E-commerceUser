import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './styleNav.css'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../service/auth/authSlice';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import StoreIcon from '@mui/icons-material/Store';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { imgUrl } from '../../functions/tokenJwtDecode';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchNav from './SearchNav';
import { getWashList } from '../../service/washList/actionWashList';
import { getCart } from '../../service/cart/actionCart';
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));
export default function NavBar() {

    const { datWashList } = useSelector((state) => state.washList)// Selects washList data from Redux store
    const { dataCart } = useSelector((state) => state.cart)// Selects cart data from Redux store
    const { isLoggedIn, userData } = useSelector((state) => state.auth);// Selects auth data from Redux store
    // State for managing navigation menus
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    // Functions to handle opening and closing navigation menus
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // useEffect hook to fetch data and track page width
    useEffect(() => {
        // Fetch wash list and cart data on component mount
        dispatch(getWashList())
        dispatch(getCart())


    }, [])
    // Navigation and dispatch functions
    const navigate = useNavigate()
    const dispatch = useDispatch();
    // Handles logout action

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login')
    };
    return (
        <div className=' fixed-top'>
            <AppBar position="static" className='NavBar  ' sx={{ backgroundColor: "#333", marginTop: "0px", zIndex: "1" }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <StoreIcon sx={{ display: { xs: 'none', md: 'flex', backgroundColor: "" }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap

                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                color: 'darkred',
                                textDecoration: 'none',
                            }}
                        >
                            <NavLink to='/home' className='text-decoration-none text-white'>
                                <span>E-commerce</span>
                            </NavLink>
                        </Typography>


                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <NavLink to='/WashList' className={({ isActive }) => isActive ? "link-activeMobile" : "link-inactiveMobile"}  >WashList
                                            <Badge badgeContent={datWashList && datWashList.length} color="primary">
                                                <FavoriteBorderIcon sx={{ color: "red" }} />
                                            </Badge>
                                        </NavLink>
                                    </Typography>

                                </MenuItem>

                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <NavLink to='/cart' className={({ isActive }) => isActive ? "link-activeMobile " : "link-inactiveMobile "}  > cart
                                            <Badge badgeContent={dataCart.cartItems && dataCart.cartItems.length} color="primary">
                                                <ShoppingCartOutlinedIcon sx={{ color: "green" }} />
                                            </Badge>
                                        </NavLink>
                                    </Typography>
                                </MenuItem>

                            </Menu>
                        </Box>
                        {/* mobile */}
                        {/* <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
                            <SearchNav />
                        </Box> */}
                        <Typography
                            variant="h5"
                            noWrap

                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <NavLink to='/home' className='text-decoration-none text-white'>
                                <span>E-commerce</span>
                            </NavLink>
                        </Typography>
                        {/*  input search web  */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: "end" } }}>
                            {/* <SearchNav /> */}
                        </Box>
                        {isLoggedIn &&


                            < Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: "end" } }}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'flex' }}
                                >
                                    <NavLink to='/WashList' className={({ isActive }) => isActive ? "link-activeWeb " : "link-inactiveWeb "}  >WashList

                                        <Badge badgeContent={datWashList && datWashList.length} color="primary">
                                            <FavoriteBorderIcon sx={{ color: "white" }} />
                                        </Badge>



                                    </NavLink>


                                    <NavLink to='/cart' className={({ isActive }) => isActive ? "link-activeWeb " : "link-inactiveWeb "}  > cart
                                        <Badge badgeContent={dataCart.cartItems && dataCart.cartItems.length} color="primary">
                                            <ShoppingCartOutlinedIcon sx={{ color: "white" }} />
                                        </Badge>
                                    </NavLink>
                                </Button>

                            </Box>

                        }
                        {isLoggedIn &&
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        {userData && <>
                                            {userData.profileImage.startsWith('https://') ?
                                                <Avatar alt={userData.name} src={userData.profileImage} /> :
                                                <Avatar alt={userData.name} src={imgUrl + userData.profileImage} />
                                            }
                                        </>
                                        }

                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >

                                    <MenuItem onClick={handleCloseUserMenu} className='d-flex'>
                                        <Typography textAlign="start">
                                            <span className=' d-flex align-items-center justify-content-between'>

                                                <NavLink to='profile' className={({ isActive }) => isActive ? "link-activeMobile " : "link-inactiveMobile  "}  >Profile </NavLink>
                                                < Person2OutlinedIcon className='mt-1' />
                                            </span>

                                            <span className=' d-flex align-items-center justify-content-between'>

                                                <NavLink to='myorder' className={({ isActive }) => isActive ? "link-activeMobile " : "link-inactiveMobile "}  >My Order </NavLink>
                                                <BorderColorOutlinedIcon className='mt-1' />
                                            </span>

                                            <span className='d-flex align-items-center justify-content-between'>

                                                <NavLink to='notification' className={({ isActive }) => isActive ? "link-activeMobile " : "link-inactiveMobile "}  >Notification </NavLink>
                                                <NotificationsNoneOutlinedIcon className=' mt-1' />
                                            </span>
                                            <span className='d-flex align-items-center justify-content-between ' onClick={handleLogout}>

                                                <NavLink className='  text-decoration-none text-danger'>logOut </NavLink>
                                                <LogoutOutlinedIcon className=' mt-1 text-danger' />
                                            </span>
                                        </Typography >
                                    </MenuItem>

                                </Menu>

                            </Box>
                        }
                        {!isLoggedIn &&
                            <>
                                <NavLink to='login' className={({ isActive }) => isActive ? "link-activeWeb " : "link-inactiveWeb "}   >Login</NavLink>
                                <NavLink to='register' className={({ isActive }) => isActive ? "link-activeWeb " : "link-inactiveWeb "}   >register</NavLink>


                            </>

                        }
                    </Toolbar>
                </Container>
            </AppBar>


        </div >
    )
}
