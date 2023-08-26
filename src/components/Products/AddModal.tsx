import { AiOutlineCloseCircle } from 'react-icons/ai';

interface IProps {
    closeModal: () => void
}

const AddModal = ({ closeModal }: IProps) => {
    return (
        <div className="flex flex-col gap-4 w-[20rem] md:w-[45rem] h-[35rem]" >
            <div>
                <AiOutlineCloseCircle className="text-error text-3xl cursor-pointer" onClick={() => { closeModal() }} />
            </div>
            <div className='flex overflow-hidden' >
                <div className='w-7/12 bg-blue-800 overflow-x-scroll' style={{ direction: 'ltr' }}>




                </div>
                <div className='w-5/12 bg-red-500 overflow-x-scroll' >
                </div>
            </div>
            <div className='fixed bottom-0 left-0 right-0 bg-yellow-400 rounded-b-xl'>
                d
            </div>

        </div>
    )
}

export default AddModal
