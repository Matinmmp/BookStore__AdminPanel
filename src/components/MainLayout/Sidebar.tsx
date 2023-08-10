import { Link, NavLink } from "react-router-dom"
import { FaCartShopping, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import {FaShoppingBag} from 'react-icons/fa';
import { AiOutlineAppstore } from 'react-icons/ai';
import { motion } from 'framer-motion'
import { useState } from 'react';


const Sidebar = () => {
    const [mini, setMini] = useState(false);

    return (
        <motion.aside
            initial={false}
            layout
            animate={{ width: mini ? '6rem' : '15rem' }}
            className='bg-info-content overflow-hidden  h-screen'>

            <div className="flex flex-col px-2">

                <div className="p-2 flex ">
                    <i className="ms-auto cursor-pointer" onClick={() => setMini(!mini)}>
                        {mini ? <FaChevronLeft /> : <FaChevronRight />}
                    </i>
                </div>

                <div className="flex items-center justify-center pt-4">
                    <Link to='/'>
                        <motion.img layout src="/images/logo2.png" className="h-16 w-24" />
                    </Link>
                </div>

                <div className={`mt-8 ${mini ? 'px-1' : 'ps-4'}`}>
                    <div>
                        {mini ? '' : <h3 className="font-bold text-gray-400">صفحه ها </h3>}

                        <div className="py-4 flex flex-col gap-2 text-white">

                            <NavLink to="/" className={({ isActive }) => isActive ? "bg-accent p-2 rounded-md" : ""}>

                                <div className="flex items-center ps-3 gap-4">
                                    <motion.i layout animate={{ fontSize: mini ? '2rem' : '1rem' }} initial={false}>
                                        <FaCartShopping />
                                    </motion.i>
                                    {mini ? '' : <motion.span layout>کالا ها</motion.span>}
                                </div>

                            </NavLink>

                            <NavLink to="/order" className={({ isActive }) => isActive ? "bg-accent p-2 rounded-md" : "p-2"}>
                                <div className="flex items-center ps-3 gap-4">
                                    <motion.i layout animate={{ fontSize: mini ? '2rem' : '1rem' }} initial={false}>
                                        <AiOutlineAppstore />
                                    </motion.i>
                                    {mini ? '' : <motion.span layout>موجودی و قیمت ها</motion.span>}
                                </div>
                            </NavLink>

                            <NavLink to="/price" className={({ isActive }) => isActive ? "bg-accent p-2 rounded-md" : "p-2"}>
                                <div className="flex items-center ps-3 gap-4">
                                    <motion.i layout animate={{ fontSize: mini ? '2rem' : '1rem' }} initial={false}>
                                        <FaShoppingBag />
                                    </motion.i>
                                    {mini ? '' : <motion.span layout> سفارش ها </motion.span>}
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>

            </div>

        </motion.aside>
    )
}

export default Sidebar
