import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '../../services/api/category';
import { ChangeEvent, useState, useRef, useEffect } from 'react';
import { SubCategory } from '../../models/Types';
import { getAllSubCategories } from '../../services/api/subCategories';
import { Editor } from '@tinymce/tinymce-react';

interface IProps {
    closeModal: () => void
}

type Inputs = {
    category: string,
    subcategory: string,
    name: string,
    price: number,
    quantity: number,
    brand: string,
    description:string
}

const AddModal = ({ closeModal }: IProps) => {
    const { register, reset, setError, formState: { errors }, handleSubmit } = useForm<Inputs>();

    const [subCategories, setSubCategories] = useState<SubCategory[]>();
    const { data: Categories } = useQuery({ queryKey: ['categories'], queryFn: getAllCategories })
    const editorRef = useRef<any>();


    const hanldeCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        getAllSubCategories(e.target.value).then(res => setSubCategories(res));
    }

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        if (data.category === '0') {
            setError("category", {
                type: "manual",
                message: "یک دسته بندی را انتخاب کنید",
            })
            return ;
        }
        if (data.subcategory === '0') {
            setError("subcategory", {
                type: "manual",
                message: "هیچ زیرشاخه ای برای این دسته بندی وجود ندارد",
            })
            return ;
        }

        // if(!editorRef.current.getContent()){
        //     setError("description", {
        //         type: "manual",
        //         message: "توضیح محصول را اضافه کنید",
        //     })
        //     return ;
        // }
        console.log(data);

    }


    return (
        <div className="flex flex-col gap-4 w-[20rem] h-[30rem] max-w-[40rem] lg:w-[60rem] lg:max-w-none lg:h-[35rem] pb-16" >
            <div>
                <AiOutlineCloseCircle className="text-error text-3xl cursor-pointer" onClick={() => { closeModal() }} />
            </div>

            <div className='flex flex-col gap-2 overflow-hidden' >

                <div className='w-full lg:w-7/12 overflow-x-auto p-4' style={{ direction: 'ltr' }}>

                    <form className='flex flex-col gap-4' >

                        <div className="form-control w-full relative pb-6 ">
                            <input type="text" {...register('name', { required: " نام کتاب را انتخاب کنید" })}
                                placeholder="نام محصول را وارد کنید" className="input input-accent input-bordered w-full" />
                            {errors.name &&
                                <label className="label text-error absolute bottom-0 p-0">
                                    <span className="label-text-alt text-error ">{errors.name.message}</span>
                                </label>}

                        </div>

                        <div className="form-control w-full relative pb-6">
                            <input type="text" {...register('brand', { required: "نام انتشارات را انتخاب کنید" })}
                                placeholder="نام انتشارات را وارد کنید" className="input input-accent input-bordered w-full" />
                            {errors.brand &&
                                <label className="label text-error absolute bottom-0 p-0">
                                    <span className="label-text-alt text-error ">{errors.brand.message}</span>
                                </label>}
                        </div>

                        <div className="form-control relative pb-6" >
                            <select {...register('category', { required: "یک دسته بندی انتخاب کنید" })}
                                className="select select-accent w-full " defaultValue={0} onChange={hanldeCategoryChange}>
                                <option disabled value={0}>یک دسته بندی انتخاب کنید</option>
                                {Categories?.map((category) =>
                                    <option value={category._id} key={category._id}>{category.name}</option>)}
                            </select>
                            {errors.category &&
                                <label className="label text-error absolute bottom-0 p-0">
                                    <span className="label-text-alt text-error ">{errors.category.message}</span>
                                </label>}
                        </div>

                        <div className="form-contro relative pb-6">
                            <select  {...register('subcategory', { required: "یک زیرشاخه انتخاب کنید" })}

                                className="select select-accent w-full ">
                                {subCategories?.length ? subCategories?.map((subCateogry) =>
                                    <option value={subCateogry._id} key={subCateogry._id}>{subCateogry.name}</option>)
                                    : <option >هیچ زیر شاخه ای  وجود ندارد</option>
                                }
                            </select>
                            {errors.subcategory &&
                                <label className="label text-error absolute bottom-0 p-0">
                                    <span className="label-text-alt text-error ">{errors.subcategory.message}</span>
                                </label>}
                        </div>

                        <div className='flex flex-col lg:flex-row gap-2 pb-6'>

                            <div className="form-control w-full relative pb-6">
                                <input  {...register('price', { required: "قیمت را وارد کنید" })}
                                    type="number" placeholder="قیمت را وارد کنید" className="input input-accent input-bordered w-full" />
                                {errors.price &&
                                    <label className="label text-error absolute bottom-0 p-0">
                                        <span className="label-text-alt text-error ">{errors.price.message}</span>
                                    </label>}
                            </div>

                            <div className="form-control w-full relative pb-6">
                                <input {...register('quantity', { required: " تعداد محصول را وارد کنید" })}
                                    type="number" placeholder="تعداد را وراد کنید " className="input input-accent input-bordered w-full" />
                                {errors.quantity &&
                                    <label className="label text-error  absolute bottom-0 p-0">
                                        <span className="label-text-alt text-error ">{errors.quantity.message}</span>
                                    </label>}
                            </div>

                        </div>

                        <div className='relative pb-8'>
                            <Editor
                                onInit={(evt, editor) => editorRef.current = editor}
                                initialValue=''
                                apiKey='111'
                                init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                    ],
                                    toolbar: 'undo redo | formatselect | ' +
                                        'bold italic backcolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                            />
                            {errors.description &&
                                <label className="label text-error absolute bottom-0 ">
                                    <span className="label-text-alt text-error ">{errors.description.message}</span>
                                </label>}
                        </div>
                    </form>
                </div>
            </div >

            <div className='fixed bottom-0 left-0 right-0 py-2 bg-base-100 rounded-b-xl'>
                <div className='flex justify-center gap-4'>
                    <button className='btn btn-success' onClick={handleSubmit(onSubmit)}>افزودن</button>
                    <button className='btn btn-error' onClick={closeModal}>انصراف</button>
                </div>
            </div>

        </div >
    )
}

export default AddModal
