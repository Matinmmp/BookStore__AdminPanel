import { Outlet } from 'react-router-dom';
import Sidebar from '../components/MainLayout/Sidebar';
import Header from '../components/MainLayout/Header';
import { motion } from 'framer-motion';

type IProps={
    theme:string
}
const MainLayout = ({theme}:IProps) => {
    return (
        <motion.div layout className='flex' data-theme={theme}>
            <div>
                <Sidebar />
            </div>
            <motion.div layout className='flex flex-col w-full' >
                <Header />
                <main className='p-4'>
                    <Outlet />
                </main>

            </motion.div>
        </motion.div>
    )
}

export default MainLayout
