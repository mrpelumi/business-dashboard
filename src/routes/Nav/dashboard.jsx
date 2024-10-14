import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { signOutAuthUser } from '../../utils/firebase';
import { useRef } from 'react';

const Nav = () => {
    const navigate = useNavigate();
    const authToken = useRef("");
    const location = useLocation();

    const navLinks = [
        {
            name: 'Users',
            urlLink: '/home',
            icon: location.pathname === "/home" ?(<PersonOutlineOutlinedIcon sx={{color: 'blue', fontSize:30}}/>): (<PersonOutlineOutlinedIcon sx={{color: 'white', fontSize:30}}/>)
        },
        {
            name: 'Certificate',
            urlLink: '/home/certificate',
            icon: location.pathname === '/home/certificate' ?(<WorkspacePremiumOutlinedIcon sx={{color: 'blue', fontSize:30}} />) : (<WorkspacePremiumOutlinedIcon sx={{color: 'white', fontSize:30}} />)
        },
        {
            name: 'Receipt',
            urlLink: '/home/receipt',
            icon: location.pathname === '/home/receipt' ? ( <ReceiptOutlinedIcon sx={{color: 'blue', fontSize:30}} />): (<ReceiptOutlinedIcon sx={{color: 'white', fontSize:30}} />)
        },
        {
            name: 'Revenue',
            urlLink: '/home/revenue',
            icon: location.pathname === '/home/revenue' ? ( <ReceiptLongOutlinedIcon sx={{color: 'blue', fontSize:30}} /> ): (<ReceiptLongOutlinedIcon sx={{color: 'white', fontSize:30}} />)
        }
    ]

    useEffect(() => {
        authToken.current = localStorage.getItem('Auth_Token');
        if (authToken.current){
            navigate('/home');
        } else {
            navigate('/');
        }
    }, [])

    const signOutHandler = async () => {
        await signOutAuthUser()
        .then((response) => {
            localStorage.clear();
        })
        navigate('/');
    }

    return (
        <div className="bg-gradient-to-b from-blue-700 to-blue-900 flex flex-col pt-10 lg:pl-3 md:pl-2 sm:pl-0 h-screen">
            <div className="flex md:items-center items-start px-2 md:px-6 gap-2 md:justify-end mb-16 ">
                {window.innerWidth < "768" ? <span><DashboardOutlinedIcon sx={{color: 'white', fontSize:30}} /></span> : <span><DashboardOutlinedIcon sx={{color: 'white', fontSize:40}} /></span> }
                <span className="font-sans text-white lg:text-2xl font-medium lg:pr-6 md:text-lg hidden md:flex ">Dashboard</span>
            </div>
            <div className="col-span-3 flex flex-col justify-start lg:pl-6 pl-2 gap-6">
               {
                navLinks.map(element => {
                    return (
                        <div key={element.name}>
                        {location.pathname === element.urlLink ? 
                        (<div className="flex lg:gap-4 md:gap-2 pl-2 pt-3 pb-3 rounded-l-md bg-white">
                            <span>{element.icon} </span>
                            <Link className={"font-sans lg:text-xl md:text-lg font-semibold text-blue-800 md:flex hidden"} to={element.urlLink}>{element.name}</Link>
                        </div>) : (<div className="flex lg:gap-4 md:gap-2 pt-3 pb-3 rounded-l-md hover:bg-blue-500 hover:pl-2" onClick={() => navigate(element.urlLink)} >
                            <span>{element.icon} </span>
                            <Link className={"font-sans text-white lg:text-xl md:text-lg font-normal md:flex hidden"} to={element.urlLink}>{element.name}</Link>
                        </div>)}
                        </div>
                   )
                })
               }
            </div>
            <div className=" col-span-3 flex flex-col justify-end py-8 md:px-6 pl-2 gap-4 h-full">
                <hr className="w-3/4 h-0.25 rounded-md bg-gray-500 opacity-75" />
                <div className="flex gap-4" onClick={signOutHandler}>
                    <span><LogoutOutlinedIcon sx={{color: 'white', fontSize:30}} /></span>
                    <Link onClick={signOutHandler} className="font-sans text-white lg:text-xl md:text-lg font-normal hover:text-purple-600 md:flex hidden">Logout</Link>
                </div>
            </div>
        </div>
    )
}

export default Nav;