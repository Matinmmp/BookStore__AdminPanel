
import { useState, useEffect } from 'react';
import { Product } from '../../models/Types';
import { getAllProducts } from '../../services/api/product';
import Table from '../../components/Price/Table';
import {BiPlusCircle} from 'react-icons/bi';

const index = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [totalPage, setTotalPage] = useState<number>();
    const [page, setPage] = useState(1);
    useEffect(() => {
        getAllProducts(page).then(res => {
            setProducts(res.data.products);
            setTotalPage(res.total_pages);
        });
    }, [page]);


    return (
        <div className="felx flex-row gap-8 px-8 ">
            <div className="flex flex-col lg:flex-row gap-4 justify-between py-8">
                <div className="order-2  ">
                    <input type='text' placeholder='جست و جو' className="input input-accent w-full" />
                </div>
                <button className="btn btn-accent flex items-center gap-2 order-1 lg:order-2"> ذخیره <BiPlusCircle className="text-xl" /></button>
            </div>
            <div className="flex flex-col ">
                <Table products={products} />

                <div className="join flex flex-row-reverse justify-center mt-4">
                    {totalPage && Array.from({ length: totalPage }, (v, k) => k + 1).map(item =>
                        <button onClick={() => setPage(item)} key={item} className={`join-item btn btn-accent btn-md
                         ${page === item ? 'btn-active' : ''}`}>{item}</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default index
