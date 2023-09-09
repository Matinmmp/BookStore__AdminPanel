import { getAllOrders } from "../../services/api/order";
import { useSearchParams } from "react-router-dom";
import Table from "../../components/Order/Table";
import { useQuery } from "@tanstack/react-query";
import {useState,useEffect } from "react";


const index = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(searchParams.get('page'));
    const [delveryStatus, setDeliveryStatus] = useState(searchParams.get('deliveryStatus'));
    const [deliver, setDeliver] = useState('true');
    let { data, isLoading } = useQuery({ queryKey: ['orders', page,delveryStatus], queryFn: () => getAllOrders(Number(page),String(delveryStatus)) });

    const handleChangePage = (number: number) => {
        searchParams.set('page', String(number));
        setSearchParams(searchParams);
        setPage(String(number))
    }
    const handleOrder = (e: any) => {
        searchParams.set('deliveryStatus', e.target.value);
        searchParams.set('page', '1');
        setSearchParams(searchParams);
        setDeliveryStatus(e.target.value);
        setDeliver(e.target.value);
        setPage('1')
    }
    useEffect(() => {
        if (!isLoading)
            if (data?.orders.length === 0)
                handleChangePage(data?.totalPages)

    }, [data?.orders.length])
    return (
        <div className="felx flex-row gap-8 px-8 ">
            <div className="flex flex-col   lg:flex-row gap-4 justify-between py-8">
                <div>
                    <select className='px-2 py-1 cursor-pointer rounded-md bg-accent text-white' onChange={handleOrder} value={deliver}>
                        <option value="true" className='p-2'>تحویل داده شده</option>
                        <option value="false" className='p-2'>تحویل داده نشده</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-col ">
                {!isLoading && <Table orders={data?.orders} />}

                <div className="join flex flex-row-reverse justify-center mt-4">
                {!isLoading && data?.totalPages && Array.from({ length: data.totalPages }, (v, k) => k + 1).map(number =>
                        <button onClick={() => handleChangePage(number)} key={number} className={`join-item btn btn-accent btn-md
                         ${Number(page) === number ? 'btn-active' : ''}`}>{number}</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default index
