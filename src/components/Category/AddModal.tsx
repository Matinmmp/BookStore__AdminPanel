import { useForm } from 'react-hook-form';
import { AiOutlineCloseCircle } from 'react-icons/ai';

interface IProps {
    closeModal: () => void
}

type Inputs = {
    name: string,
    icon: string
}

const AddModal = ({ closeModal }: IProps) => {

    const { register, reset, formState: { errors }, handleSubmit } = useForm<Inputs>();

    return (
        <div className="flex flex-col gap-4 min-w-[20rem] min-h-[15rem]" >
            <div><AiOutlineCloseCircle className="text-error text-3xl cursor-pointer" onClick={() => { closeModal(), reset() }} /></div>
            <div className='flex flex-col gap-4 mt-4'>
                <div className="form-control w-full ">
                    <input type="text" placeholder="نام دسته بندی" className="input input-accent input-bordered w-full " />
                    <label className="label">
                        {/* <span className="label-text-alt">Bottom Left label</span> */}
                    </label>
                </div>
                <label htmlFor="icon">یک آیکن انتخاب کنید : </label>
                <input type="file" className="hidden" />

            </div>
        </div>
    )
}

export default AddModal
