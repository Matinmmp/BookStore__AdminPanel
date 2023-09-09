import { Outlet } from 'react-router-dom';
import Sidebar from '../components/MainLayout/Sidebar';
import Header from '../components/MainLayout/Header';
import { motion } from 'framer-motion';

const MainLayout = () => {
    return (
        <motion.div layout className='flex h-full' >
            <div>
                <Sidebar />
            </div>
            <motion.div layout className='flex flex-col w-full' >
                <Header />
                <main className='p-4 h-full'>
                    <Outlet />
                </main>

            </motion.div>
        </motion.div>
    )
}

export default MainLayout
