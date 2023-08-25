
import { AiOutlineCloseCircle } from 'react-icons/ai';


interface IProps {
    closeModal: () => void
}
const AddModal = ({ closeModal }: IProps) => {
    return (
        <div className="flex flex-col gap-4 min-w-[20rem] min-h-[15rem]" >
            <div><AiOutlineCloseCircle className="text-error text-3xl cursor-pointer" onClick={() => { closeModal() }} /></div>

        </div>
    )
}

export default AddModal
