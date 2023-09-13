import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Order } from '../../models/Types';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getUserById } from '../../services/api/user';
import { DeatailRow } from './DeatailRow';

import { editProductPriceAndQuantity } from '../../services/api/product';
import { editOrderStatus } from '../../services/api/order';


interface IProps {
    closeModal: () => void
    order: Order
}


const DetailModal = ({ closeModal, order }: IProps) => {
    const createDate = new Date(order.createdAt)
    const deliveryDate = new Date(order.deliveryDate)
    let { data, isLoading } = useQuery({ queryKey: [`order${order._id}`], queryFn: () => getUserById(order.user) });

    const promises: Promise<any>[] = [];
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: () => Promise.all(promises).then(() => { }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] })
        },
    })
    const handleDelivery = () => {
        order.products.forEach((item: any) => {
            const formData = new FormData();
            fetch(`http://localhost:8000/api/products/${item.product}`).then((res) => res.json())
                .then((res) => {  
                    formData.append('quantity', `${res.data.product.quantity - item.count}`);
                    const promis = editProductPriceAndQuantity(item.product, formData);
                    promises.push(promis);
                })
            editOrderStatus(order._id);
            mutation.mutate();
            closeModal();
        })
    }
    if (!isLoading)
        return (
            <div className="flex flex-col gap-4 min-w-[40rem] min-h-[10rem]" >
                <div className='flex justify-between'>
                    <AiOutlineCloseCircle className="text-error text-3xl cursor-pointer" onClick={() => { closeModal() }} />
                    <div>بررسی سفارشات مشتری</div>
                    <div></div>

                </div>
                <div className='flex-1 flex flex-col gap-4 p-4'>
                    <div className='flex items-center gap-2'>
                        <span>نام مشتری : </span>
                        <span>{data.firstname}  {data.lastname}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span> آدرس : </span>
                        <span>{data.address}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span> تلفن : </span>
                        <span>{data.phoneNumber}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span> زمان تحویل : </span>
                        <span>{deliveryDate.toLocaleDateString("")}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span> زمان سفارش : </span>
                        <span>{createDate.toLocaleDateString("fa", { year: "numeric", month: "2-digit", day: "2-digit" })}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className="relative  shadow-md sm:rounded-lg overflow-y-auto">
                            <table className="w-full text-left shadow-md min-w-[45rem]" >
                                <thead className=" text-white flex bg-accent  text-[.9rem]">
                                    <tr className="flex w-full justify-around text-center">
                                        <th scope="col" className="px-6 py-3 w-4/12">
                                            کالا
                                        </th>
                                        <th scope="col" className="px-6 py-3 w-4/12">
                                            قیمت
                                        </th>
                                        <th scope="col" className="px-6 py-3 w-4/12">
                                            تعداد
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="text-center max-h-[55vh] flex flex-col overflow-auto w-full">
                                    {order.products.map((item: any, index: number) =>
                                        <DeatailRow key={item._id} item={item} order={order} />)}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center gap-4 text-white py-1'>
                    {order.deliveryStatus ?
                        <button className='btn btn-success' > 'انجام شده' </button> :
                        <button className='btn btn-success' onClick={handleDelivery}>تحویل داده شود </button>
                    }

                </div>
            </div>
        )
}

export default DetailModal
