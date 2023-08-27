import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '../../services/api/category';
import { ChangeEvent, useState, useRef } from 'react';
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
    description: string,
}

const AddModal = ({ closeModal }: IProps) => {

    const [subCategories, setSubCategories] = useState<SubCategory[]>();
    const { data: Categories } = useQuery({ queryKey: ['categories'], queryFn: getAllCategories })
    const editorRef = useRef<any>();


    const hanldeCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        getAllSubCategories(e.target.value).then(res => setSubCategories(res));
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
                            <input type="text" placeholder="نام محصول را وارد کنید" className="input input-accent input-bordered w-full" />

                            <label className="label text-error absolute bottom-0 p-0">
                                <span className="label-text-alt text-error "></span>
                            </label>

                        </div>

                        <div className="form-control w-full relative pb-6">
                            <input type="text"
                                placeholder="نام انتشارات را وارد کنید" className="input input-accent input-bordered w-full" />
                            {
                                <label className="label text-error absolute bottom-0 p-0">
                                    <span className="label-text-alt text-error "></span>
                                </label>}
                        </div>

                        <div className="form-control relative pb-6" >
                            <select
                                className="select select-accent w-full " defaultValue={0} onChange={hanldeCategoryChange}>
                                <option disabled value={0}>یک دسته بندی انتخاب کنید</option>
                                {Categories?.map((category) =>
                                    <option value={category._id} key={category._id}>{category.name}</option>)}
                            </select>
                            {
                                <label className="label text-error absolute bottom-0 p-0">
                                    <span className="label-text-alt text-error "></span>
                                </label>}
                        </div>

                        <div className="form-contro relative pb-6">
                            <select
                                className="select select-accent w-full ">
                                {/* <option disabled ></option> */}
                                {subCategories?.length ? subCategories?.map((subCateogry) =>
                                    <option value={subCateogry._id} key={subCateogry._id}>{subCateogry.name}</option>)
                                    : <option >هیچ زیر شاخه ای  وجود ندارد</option>
                                }
                            </select>
                            <label className="label text-error absolute bottom-0 p-0">
                                <span className="label-text-alt text-error "></span>
                            </label>
                        </div>

                        <div className='flex flex-col lg:flex-row gap-2 pb-6'>

                            <div className="form-control w-full relative pb-6">
                                <input
                                    type="number" placeholder="قیمت را وارد کنید" className="input input-accent input-bordered w-full" />

                                <label className="label text-error absolute bottom-0 p-0">
                                    <span className="label-text-alt text-error "></span>
                                </label>
                            </div>

                            <div className="form-control w-full relative pb-6">
                                <input
                                    type="number" placeholder="تعداد را وراد کنید " className="input input-accent input-bordered w-full" />

                                <label className="label text-error  absolute bottom-0 p-0">
                                    <span className="label-text-alt text-error "></span>
                                </label>
                            </div>

                        </div>

                        <div>
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

                            <label className="label text-error pb-4">
                                <span className="label-text-alt text-error absolute bottom-0"></span>
                            </label>
                        </div>

                    </form>
                </div>
            </div>

            <div className='fixed bottom-0 left-0 right-0 py-2 bg-base-100 rounded-b-xl'>
                <div className='flex justify-center gap-4'>
                    <button className='btn btn-success'>افزودن</button>
                    <button className='btn btn-error' onClick={closeModal}>انصراف</button>
                </div>
            </div>

        </div>
    )
}

export default AddModal
