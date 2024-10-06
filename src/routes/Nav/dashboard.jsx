import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { Link } from 'react-router-dom';

const navLinks = [
    {
        name: 'Users',
        urlLink: '/',
        icon: <PersonOutlineOutlinedIcon sx={{color: 'white', fontSize:30}}/>
    },
    {
        name: 'Certificate',
        urlLink: '/certificate',
        icon: <WorkspacePremiumOutlinedIcon sx={{color: 'white', fontSize:30}} />
    },
    {
        name: 'Receipt',
        urlLink: '/receipt',
        icon: <ReceiptOutlinedIcon sx={{color: 'white', fontSize:30}} />
    },
    {
        name: 'Revenue',
        urlLink: '/revenue',
        icon: <ReceiptLongOutlinedIcon sx={{color: 'white', fontSize:30}} />
    }
]


const Nav = () => {

    return (
        <div className="bg-gradient-to-b from-blue-700 to-blue-900 p-2 grid grid-col-5 gap-3 col-span-1">
            <div className="col-span-3 flex items-center px-6 gap-2">
                <span><DashboardOutlinedIcon sx={{color: 'white', fontSize:40}} /></span>
                <span className="font-sans text-white text-2xl font-medium">Dashboard</span>
            </div>
            <div className="col-span-3 flex flex-col justify-start px-6 gap-10">
               {
                navLinks.map(element => {
                    return (
                        <div className="flex gap-4" key={element.name} >
                            <span>{element.icon} </span>
                            <Link className={"font-sans text-white text-xl font-normal"} to={element.urlLink}>{element.name}</Link>
                        </div>
                   )
                })
               }
            </div>
            <div className=" col-span-3 flex flex-col justify-end py-8 px-6 gap-4">
                <hr className="w-3/4 h-0.25 rounded-md bg-gray-500 opacity-75" />
                <div className="flex gap-4">
                    <span><LogoutOutlinedIcon sx={{color: 'white', fontSize:30}} /></span>
                    <span className="font-sans text-white text-xl font-normal">Logout</span>
                </div>
            </div>
        </div>
    )
}

export default Nav;