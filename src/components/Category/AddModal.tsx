import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { useRef, useState, ChangeEvent } from 'react';
import { postCategory } from '../../services/api/category';
import { useQueryClient } from 'react-query';

interface IProps {
    closeModal: () => void
}

type Inputs = {
    name: string,
    icon: string
}

const AddModal = ({ closeModal }: IProps) => {

    const { register, formState: { errors }, handleSubmit, } = useForm<Inputs>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageURL, setImageURL] = useState<File>();

    const queryClient = useQueryClient();
    queryClient.invalidateQueries({
        queryKey: ['categories']
    })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('icon', imageURL);
        postCategory(formData);
        
        closeModal()
    }
    const openFileInput = () => {
        fileInputRef.current?.click();

    }
    const setImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (fileInputRef.current?.files?.length)
            setImageURL(fileInputRef.current.files[0]);
    }

    return (
        <div className="flex flex-col gap-4 min-w-[20rem] min-h-[15rem]" >
            <div><AiOutlineCloseCircle className="text-error text-3xl cursor-pointer" onClick={() => { closeModal() }} /></div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-4 py-4'>
                    <div className="form-control w-full relative pb-6">

                        <input type="text" {...register('name', { required: "نام دسته بندی را انتخاب کنید" })}
                            placeholder="نام دسته بندی" className="input input-accent input-bordered w-full " />
                        {errors.name &&
                            <label className="label absolute p-0 bottom-0">
                                <span className="label-text-alt text-error">{errors.name.message}</span>
                            </label>}
                    </div>
                    <div className='flex justify-between items-center relative pb-6'>
                        <label htmlFor="icon"> آیکن  : </label>
                        {!fileInputRef.current?.files?.length &&
                            <label className="label absolute p-0 bottom-5">
                                <span className="label-text-alt text-error">یک آیکن انتخاب کنید</span>
                            </label>}

                        <input type="file" ref={fileInputRef} onChange={setImage}
                            className="hidden" accept="image/*" />

                        <div onClick={openFileInput} onEnded={() => console.log("end")}
                            className='w-16 h-16 rounded-md mask mask-squircle flex items-center justify-center cursor-pointer'>
                            {fileInputRef.current?.files?.length ? <img src={URL.createObjectURL(imageURL)} className='w-16 h-16 object-cover' />
                                : <BsPlusCircleDotted className="text-5xl" />}
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <button className='btn btn-accent w-24 m'>افزودن</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddModal
