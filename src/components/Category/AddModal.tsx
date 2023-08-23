import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { useRef, useState } from 'react';
interface IProps {
    closeModal: () => void
}

type Inputs = {
    name: string,
    icon: string
}

const AddModal = ({ closeModal }: IProps) => {

    const { register, reset, formState: { errors }, handleSubmit } = useForm<Inputs>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageURL, setImageURL] = useState('');
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(fileInputRef.current?.value);

    }
    const openFileInput = () => {
        fileInputRef.current?.click();
    }
    const setImage = () => {
        var reader = new FileReader();
        reader.onload = function (event) {
            image.src = event.target.result;

            reader.readAsDataURL(files[0]);
        }
        setImageURL(String(fileInputRef.current?.value))
    }

    return (
        <div className="flex flex-col gap-4 min-w-[20rem] min-h-[15rem]" >
            <div><AiOutlineCloseCircle className="text-error text-3xl cursor-pointer" onClick={() => { closeModal(), reset() }} /></div>
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

                        <input ref={fileInputRef} type="file" onChange={setImage}
                            className="hidden" accept="image/*" />

                        <div onClick={openFileInput} onEnded={() => console.log("end")}
                            className='w-16 h-16 rounded-md mask mask-squircle flex items-center justify-center cursor-pointer'>
                            {!fileInputRef.current?.value ? <img src={`C:/fakepath/Fantasy_World.webp`} className='w-16 h-16 object-cover' />
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
