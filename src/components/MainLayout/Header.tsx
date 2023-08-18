import { GiHamburgerMenu } from 'react-icons/gi';
import { motion } from 'framer-motion';
import { useContext, useState, ChangeEvent, useEffect } from 'react';
import { MainContext } from '../../context/Store';
import { RiLogoutBoxLine } from 'react-icons/ri';
import Cookies from 'js-cookie';
import { logOut } from '../../services/api/user';
import { useNavigate } from 'react-router-dom';



const Header = () => {
    const { handleIsMenuOpen } = useContext(MainContext);
    // const { theme, getTheme } = useContext(MainContext);
    const savedTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'system';
    const [theme, setTheme] = useState(savedTheme);


    const navigate = useNavigate();
    const logout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        logOut();
        navigate('/admin/login');
    }

    const handleTheme = (e: ChangeEvent<HTMLSelectElement>) => {
        localStorage.setItem('theme', e.target.value);
        setTheme(e.target.value)
    }

    useEffect(() => {
        const htmlTheme = document.getElementById('html');
        if (theme)
            htmlTheme?.setAttribute('data-theme', theme);

    }, [theme]);

    return (
        <motion.section layout
            className=" p-2 bg-info-content">
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <span onClick={() => handleIsMenuOpen()}><GiHamburgerMenu className='cursor-pointer text-2xl text-white' /></span>
                    <select className='px-2 py-1 cursor-pointer rounded-md bg-accent text-white' onChange={handleTheme} value={String(theme)}>
                        <option value="system" className='p-2'>سیستم</option>
                        <option value="dark" className='p-2'>تاریک</option>
                        <option value="light" className='p-2'>روشن</option>
                    </select>
                </div>
                <div>
                    <i className='cursor-pointer text-2xl hover:text-accent text-white' onClick={logout}><RiLogoutBoxLine /></i>
                </div>

            </div>
        </motion.section>
    )
}

export default Header
