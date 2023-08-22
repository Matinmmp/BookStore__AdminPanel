import { useEffect, useState } from "react";
import Table from "../../components/Order/Table";
import { Order } from "../../models/Types";
import { getAllOrder } from "../../services/api/order";


const index = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [deliver, setDeliver] = useState('notdeliver');
    const [totalPage, setTotalPage] = useState<number>();
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (deliver === 'notdeliver')
            getAllOrder(page, false).then(res => {
                setOrders(res.data.orders);
                setTotalPage(res.total_pages);
            });
        else
            getAllOrder(page, true).then(res => {
                setOrders(res.data.orders);
                setTotalPage(res.total_pages);
            });
    }, [page, deliver]);

    const handleOrder = (e: any) => {
        setDeliver(e.target.value);
    }

    return (
        <div className="felx flex-row gap-8 px-8 ">
            <div className="flex flex-col items-center lg:flex-row gap-4 justify-between py-8">
                <div className="order-2  ">
                    <input type='text' placeholder='جست و جو' className="input input-accent w-full" />
                </div>
                <div>
                    <select className='px-2 py-1 cursor-pointer rounded-md bg-accent text-white' onChange={handleOrder} value={deliver}>
                        <option value="deliver" className='p-2'>تحویل داده شده</option>
                        <option value="notdeliver" className='p-2'>تحویل داده نشده</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-col ">
                <Table orders={orders} />

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
