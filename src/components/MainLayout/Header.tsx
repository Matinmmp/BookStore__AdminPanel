import { GiHamburgerMenu } from 'react-icons/gi';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { MainContext } from '../../context/Store';


const Header = () => {
    const { handleIsMenuOpen,isMenuOpen } = useContext(MainContext)
    console.log(isMenuOpen);
    
    return (
        <motion.section layout
            className=" p-2 bg-info-content">
            <div className='flex items-center justify-between'>
                <span onClick={()=>handleIsMenuOpen()}><GiHamburgerMenu className='cursor-pointer text-2xl' /></span>
                <div>
                    t
                </div>
            </div>
        </motion.section>
    )
}

export default Header
