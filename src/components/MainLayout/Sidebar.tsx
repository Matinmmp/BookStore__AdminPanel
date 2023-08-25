import { Link, NavLink } from "react-router-dom"
import { FaCartShopping, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { BiSolidCategoryAlt } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { VscTypeHierarchySub } from 'react-icons/vsc';
import { FaShoppingBag } from 'react-icons/fa';
import { AiOutlineAppstore } from 'react-icons/ai';
import { AiFillHome } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { useContext, useState } from 'react';
import { MainContext } from "../../context/Store";


const Sidebar = () => {
    const [mini, setMini] = useState(false);
    const { isMenuOpen, handleIsMenuOpen } = useContext(MainContext);

    return (
        <motion.aside
            initial={false}
            layout
            animate={{ width: isMenuOpen ? '0' : 'auto' }}
            transition={{ ease: "easeInOut", duration: .4 }}
            className='bg-info-content overflow-hidden h-screen fixed top-0 right-0 bottom-0 lg:relative z-50'>

            <motion.div
                initial={false}
                layout
                animate={{ width: mini ? '6rem' : '15rem' }}>
                <div className="flex flex-col px-2">
                    <div className="py-2 flex justify-between text-white">
                        <i className=' cursor-pointer text-2xl lg:hidden ' onClick={() => handleIsMenuOpen()}>
                            <AiOutlineClose />
                        </i>
                        <i className="ms-auto cursor-pointer" onClick={() => setMini(!mini)}>
                            {mini ? <FaChevronLeft /> : <FaChevronRight />}
                        </i>
                    </div>

                    <div className="flex items-center justify-center pt-4">
                        <Link to='/admin/orders'>
                            <motion.img layout src="/images/logo2.png" className="h-16 w-24" />
                        </Link>
                    </div>

                    <div className={`mt-8 ${mini ? 'px-1' : 'ps-4'}`}>
                        <div>
                            {mini ? '' : <h3 className="font-bold text-gray-400">صفحه ها </h3>}

                            <div className="py-4 flex flex-col gap-2 text-white">
                                <NavLink to="/admin/" className={({ isActive }) => isActive ? "bg-accent p-2 rounded-md" : "p-2"}>

                                    <div className="flex items-center ps-3 gap-4">
                                        <motion.i layout animate={{ fontSize: mini ? '2rem' : '1rem' }} initial={false}>
                                            <AiFillHome />
                                        </motion.i>
                                        {mini ? '' : <motion.span layout>خانه</motion.span>}
                                    </div>

                                </NavLink>

                                <NavLink to="/admin/products?page=1" className={({ isActive }) => isActive ? "bg-accent p-2 rounded-md" : "p-2"}>

                                    <div className="flex items-center ps-3 gap-4">
                                        <motion.i layout animate={{ fontSize: mini ? '2rem' : '1rem' }} initial={false}>
                                            <FaCartShopping />
                                        </motion.i>
                                        {mini ? '' : <motion.span layout>کالا ها</motion.span>}
                                    </div>

                                </NavLink>

                                <NavLink to="/admin/price" className={({ isActive }) => isActive ? "bg-accent p-2 rounded-md" : "p-2"}>
                                    <div className="flex items-center ps-3 gap-4">
                                        <motion.i layout animate={{ fontSize: mini ? '2rem' : '1rem' }} initial={false}>
                                            <AiOutlineAppstore />
                                        </motion.i>
                                        {mini ? '' : <motion.span layout>موجودی و قیمت ها</motion.span>}
                                    </div>
                                </NavLink>

                                <NavLink to="/admin/orders" className={({ isActive }) => isActive ? "bg-accent p-2 rounded-md" : "p-2"}>
                                    <div className="flex items-center ps-3 gap-4">
                                        <motion.i layout animate={{ fontSize: mini ? '2rem' : '1rem' }} initial={false}>
                                            <FaShoppingBag />
                                        </motion.i>
                                        {mini ? '' : <motion.span layout> سفارش ها </motion.span>}
                                    </div>
                                </NavLink>

                                <NavLink to="/admin/categories" className={({ isActive }) => isActive ? "bg-accent p-2 rounded-md" : "p-2"}>
                                    <div className="flex items-center ps-3 gap-4">
                                        <motion.i layout animate={{ fontSize: mini ? '2rem' : '1rem' }} initial={false}>
                                            <BiSolidCategoryAlt />
                                        </motion.i>
                                        {mini ? '' : <motion.span layout> دسنه بندی ها </motion.span>}
                                    </div>
                                </NavLink>
                                <NavLink to="/admin/subcategories" className={({ isActive }) => isActive ? "bg-accent p-2 rounded-md" : "p-2"}>
                                    <div className="flex items-center ps-3 gap-4">
                                        <motion.i layout animate={{ fontSize: mini ? '2rem' : '1rem' }} initial={false}>
                                            <VscTypeHierarchySub />
                                        </motion.i>
                                        {mini ? '' : <motion.span layout> زیر دسته بندی </motion.span>}
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.aside>

    )
}

export default Sidebar
