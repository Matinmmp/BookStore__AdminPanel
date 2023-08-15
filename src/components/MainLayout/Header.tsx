import { GiHamburgerMenu } from 'react-icons/gi';
import { motion } from 'framer-motion';
import { useContext, useState, ChangeEvent } from 'react';
import { MainContext } from '../../context/Store';
import { RiLogoutBoxLine } from 'react-icons/ri';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';



const Header = () => {
    // const [theme, setTheme] = useState<string>();
    const { handleIsMenuOpen } = useContext(MainContext);
    const { user,theme ,getTheme} = useContext(MainContext);

    console.log(theme);
    
    const navigate = useNavigate();
    const logout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        navigate('/admin/login');
    }

    const handleTheme = (e: ChangeEvent<HTMLSelectElement>) => {
        getTheme(e.target.value)
    }

    return (
        <motion.section layout
            className=" p-2 bg-info-content">
            <div className='flex items-center justify-between'>
                <span onClick={() => handleIsMenuOpen()}><GiHamburgerMenu className='cursor-pointer text-2xl text-white' /></span>
                <select className='px-2 py-1 cursor-pointer rounded-md' onChange={handleTheme} value={theme}>
                    <option value="system" className='p-2'>سیستم</option>
                    <option value="dark" className='p-2'>تاریک</option>
                    <option value="light" className='p-2'>روشن</option>
                </select>
                <div>
                    <i className='cursor-pointer text-2xl hover:text-accent text-white' onClick={logout}><RiLogoutBoxLine /></i>
                </div>

            </div>
        </motion.section>
    )
}

export default Header
