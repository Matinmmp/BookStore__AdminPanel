import { Outlet } from 'react-router-dom';
import Sidebar from '../components/MainLayout/Sidebar';
import Header from '../components/MainLayout/Header';
import { motion } from 'framer-motion';

const MainLayout = () => {
    return (
        <motion.div layout className='flex' >
            <div>
                <Sidebar />
            </div>
            <motion.div layout className='flex flex-col w-full' >
                <Header />
                <main>
                    <Outlet />
                </main>

            </motion.div>
        </motion.div>
    )
}

export default MainLayout
