
import { useMutation,  useQueryClient } from '@tanstack/react-query';
import { deleteProduct } from '../../services/api/product';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import {toast} from 'react-toastify';

interface IProps {
    closeModal: () => void
    name: string
    id: string
}
const DeleteModal = ({ closeModal, name, id }: IProps) => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('حذف با موفقیت انجان شد.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                });
        },
    })

    const hendleDeleteProduct = () => {
        mutation.mutate(id);
    }

    return (
        <div className="flex flex-col gap-4 min-w-[20rem] min-h-[10rem]" >
            <div>
                <AiOutlineCloseCircle className="text-error text-3xl cursor-pointer" onClick={() => { closeModal() }} />
            </div>
            <div className='flex-1'>
                آیا از حذف محصول {name} مطمعن هستید ؟
            </div>
            <div className='flex justify-center gap-4 text-white py-1'>
                <button className='btn btn-success' onClick={hendleDeleteProduct}>بله</button>
                <button className='btn btn-warning' onClick={closeModal}>خیر</button>
            </div>
        </div>
    )
}

export default DeleteModal
