import { useForm } from 'react-hook-form';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getAllCategories } from '../../services/api/category';
import { ChangeEvent, useState, useRef } from 'react';
import { SubCategory } from '../../models/Types';
import { getAllSubCategories } from '../../services/api/subCategories';
import { Editor } from '@tinymce/tinymce-react';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { BsFillImageFill } from 'react-icons/bs';
import { BiMinus } from 'react-icons/bi';
import { postProduct, updateProduct } from '../../services/api/product';
import { useSearchParams } from 'react-router-dom';

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
    description: string
    thumbnail: string,
    images: string
}

const AddModal = ({ closeModal }: IProps) => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(searchParams.get('page'));
    const { register, setError, formState: { errors }, getValues, clearErrors } = useForm<Inputs>();
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [thumbnailURL, setThumbnailURL] = useState<any>();
    const [imagesURL, setImagesURL] = useState<any[]>([]);
    const [selectedImage, setSelectedImage] = useState<number>(0);
    const { data: Categories } = useQuery({ queryKey: ['categories'], queryFn: getAllCategories })
    const editorRef = useRef<any>();
    const imagesFileRef = useRef<any>();
    const thumbnailFileRef = useRef<HTMLInputElement>(null);


    const openThumbnailFileInput = () => thumbnailFileRef.current?.click();

    const openImageFileInput = () => imagesFileRef.current?.click();

    const hanldeCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        getAllSubCategories(e.target.value).then(res => setSubCategories(res));
    }

    const validation = () => {
        let isValid = true
        clearErrors();
        if (!getValues('name')) {
            setError("name", { message: "نام محصول را وارد کنید" });
            isValid = false;
        }
        if (!getValues('brand')) {
            setError("brand", { message: "نام انتشارات را وارد کنید" });
            isValid = false;
        }
        if (!getValues('price')) {
            setError("price", { message: "قیمت را وارد کنید" });
            isValid = false;
        }
        if (!getValues('quantity')) {
            setError("quantity", { message: "تعداد را وارد کنید" });
            isValid = false;
        }
        if (getValues('category') === '0') {
            setError("category", { message: "یک دسته بندی را انتخاب کنید" });
            isValid = false;
        }
        if (subCategories?.length < 1) {
            setError("subcategory", { message: "هیچ زیرشاخه ای برای این دسته بندی وجود ندارد" });
            isValid = false;
        }
        if (!thumbnailURL) {
            setError("thumbnail", { message: "عکس پس زمینه را انتخاب کنید" });
            isValid = false;
        }
        if (!imagesURL.length) {
            setError("images", { message: "حداقل یک عکس برای محصول انتخاب کنید" });
            isValid = false;
        }

        if (!isValid) return isValid;
        return isValid;
    }

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: postProduct,
        onSuccess: () => {
            closeModal();

            queryClient.invalidateQueries({ queryKey: ['products',page] })
        },
    })

    const addProduct = () => {

        const formData = new FormData();
        formData.append('name', getValues('name'));
        formData.append('brand', getValues('brand'));
        formData.append('category', getValues('category'));
        if (getValues('subcategory') === "0") formData.append('subcategory', subCategories[0]._id);
        else formData.append('subcategory', getValues('subcategory'));
        formData.append('description', editorRef.current.value);
        formData.append('price', `${getValues('price')}`);
        formData.append('quantity', `${getValues('quantity')}`);
        formData.append('thumbnail', thumbnailURL);
        for (let i = 0; i < imagesURL.length; i++) {
            formData.append('images', imagesURL[i], `${i}.png`);
        }
        mutation.mutate(formData);
    }

    const handleErrors = () => {
        if (validation()) addProduct()
    }

    const setThumbnail = () => {
        if (thumbnailFileRef.current?.files?.length)
            setThumbnailURL(thumbnailFileRef.current.files[0]);
    }

    const setImage = () => {
        if (imagesFileRef.current?.files?.length) {
            setImagesURL((imagesURL) => [...imagesURL, imagesFileRef.current.files[0]]);
            setSelectedImage(imagesURL.length);
        }
    }

    const deleteImage = (e: any, index: number) => {
        e.stopPropagation()
        setImagesURL((imagesURL) => imagesURL.filter((_, imageIndex) => imageIndex !== index));
        if (index === 0) setSelectedImage(index)
        else setSelectedImage(index - 1)
    }

    return (
        <div className="flex flex-col gap-4 w-[20rem] h-[30rem] max-w-[40rem] 
        lg:w-[60rem] lg:max-w-none lg:h-[35rem] pb-16 overflow-hidden" >

            <div className='flex justify-between py-2'>
                <AiOutlineCloseCircle className="text-error text-3xl cursor-pointer" onClick={() => { closeModal() }} />
                <p className='text-2xl text-accent'>افزودن محصول</p>
                <div></div>
            </div>

            <div className='flex flex-col lg:flex-row gap-2 overflow-x-auto' >

                <div className='w-full lg:w-7/12 overflow-x-clip lg:overflow-x-auto  p-4' style={{ direction: 'ltr' }}>
                    <form className='flex flex-col gap-4' >

                        <div className="form-control w-full relative pb-6 ">
                            <input type="text"  {...register("name")}
                                placeholder="نام محصول را وارد کنید" className="input input-accent input-bordered w-full" />
                            {errors.name && <label className="label text-error absolute bottom-0 p-0">
                                <span className="label-text-alt text-error ">{errors.name.message}</span></label>}
                        </div>

                        <div className="form-control w-full relative pb-6">
                            <input type="text" {...register("brand")}
                                placeholder="نام انتشارات را وارد کنید" className="input input-accent input-bordered w-full" />
                            {errors.brand && <label className="label text-error absolute bottom-0 p-0">
                                <span className="label-text-alt text-error ">{errors.brand.message}</span></label>}
                        </div>

                        <div className="form-control relative pb-6" >
                            <select {...register("category")}
                                className="select select-accent w-full " defaultValue={0} onChange={hanldeCategoryChange}>
                                <option disabled value={0}>یک دسته بندی انتخاب کنید</option>
                                {Categories?.map((category) =>
                                    <option value={category._id} key={category._id}>{category.name}</option>)}
                            </select>
                            {errors.category && <label className="label text-error absolute bottom-0 p-0">
                                <span className="label-text-alt text-error ">{errors.category.message}</span></label>}
                        </div>

                        <div className="form-contro relative pb-6">
                            <select {...register("subcategory")} className="select select-accent w-full ">
                                {subCategories?.length ? subCategories?.map((subCateogry) =>
                                    <option value={subCateogry._id} key={subCateogry._id}>{subCateogry.name}</option>)
                                    : <option value={0}>هیچ زیر شاخه ای  وجود ندارد</option>
                                }
                            </select>
                            {errors.subcategory && <label className="label text-error absolute bottom-0 p-0">
                                <span className="label-text-alt text-error ">{errors.subcategory.message}</span></label>}
                        </div>

                        <div className='flex flex-col lg:flex-row gap-2 pb-6'>

                            <div className="form-control w-full relative pb-6">
                                <input type="number" {...register("price")}
                                    placeholder="قیمت را وارد کنید" className="input input-accent input-bordered w-full" />
                                {errors.price && <label className="label text-error absolute bottom-0 p-0">
                                    <span className="label-text-alt text-error ">{errors.price.message}</span></label>}
                            </div>

                            <div className="form-control w-full relative pb-6">
                                <input type="number" {...register("quantity")}
                                    placeholder="تعداد را وراد کنید " className="input input-accent input-bordered w-full" />
                                {errors.quantity && <label className="label text-error  absolute bottom-0 p-0">
                                    <span className="label-text-alt text-error ">{errors.quantity.message}</span></label>}
                            </div>

                        </div>

                        <div className='relative pb-8'>
                            {/* <Editor onInit={(evt, editor) => editorRef.current = editor}
                                initialValue='' 
                                init={{
                                    height: 500, menubar: false,
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
                                }}/> */}
                                <textarea placeholder='توضیحات' rows={10} className='textarea textarea-accent w-full' ref={editorRef}/>
                            {errors.description && <label className="label text-error absolute bottom-0 ">
                                <span className="label-text-alt text-error ">{errors.description.message}</span></label>}
                        </div>

                    </form>
                </div>

                <div className=' w-full lg:w-5/12 overflow-x-clip lg:overflow-x-auto p-4 ' style={{ direction: 'ltr' }}>
                    <div className=' flex flex-col gap-12 '>
                        <div className={`h-[20rem] flex items-center justify-center  rounded-md relative
                         ${!thumbnailURL && 'border-dashed border-4'}`}>
                            <input type="file" ref={thumbnailFileRef} onChange={setThumbnail}
                                className="hidden" accept="image/*" />

                            <div onClick={openThumbnailFileInput}
                                className='w-full h-full rounded-md flex items-center justify-center cursor-pointer'>
                                {thumbnailFileRef.current?.files?.length ?
                                    <img src={URL.createObjectURL(thumbnailURL)} className='w-full h-full
                                 object-cover rounded-lg shadow-sm shadow-accent' />
                                    : <div className='flex flex-col items-center justify-center gap-4'>
                                        <BsFillImageFill className="text-[10rem] " />
                                        <p>عکس پس زمینه را انتخاب کنید</p>
                                    </div>}
                            </div>
                            {errors.thumbnail && <label className="label text-error absolute bottom-[-2rem] p-0">
                                <span className="label-text-alt text-error ">{errors.thumbnail.message}</span></label>}
                        </div>

                        <div className='h-[17rem] flex gap-2 overflow-hidden py-2 pb-12' >
                            <div className='overflow-auto p-2 flex flex-col gap-2 ' style={{ direction: 'ltr' }}>
                                <input type="file" ref={imagesFileRef} onChange={setImage}
                                    className="hidden" accept="image/*" />

                                {imagesURL.map((imageURL, index) =>
                                    <div className={`mask mask-squircle relative  ${selectedImage === index && 'scale-110 transition-transform '}`}
                                        key={index} onClick={() => { setSelectedImage(index) }}>
                                        <div className='w-16 h-16 bg-base-300 flex items-center justify-center cursor-pointer'>
                                            {imagesFileRef.current?.files?.length ? <img src={URL.createObjectURL(imageURL)} className='w-16 h-16 object-cover' />
                                                : <BsPlusCircleDotted className="text-5xl" />}
                                        </div>
                                        <span className='absolute z-50 top-[5px] right-[5px] rounded-xl bg-red-600 cursor-pointer'
                                            onClick={(e) => deleteImage(e, index)}>
                                            <BiMinus className=' text-lg text-white' />
                                        </span>
                                    </div>
                                )}

                                <div className=' mask mask-squircle'>
                                    <div onClick={openImageFileInput}
                                        className='w-16 h-16 bg-base-300 flex items-center justify-center cursor-pointer'>
                                        <BsPlusCircleDotted className="text-5xl" />
                                    </div>
                                </div>

                            </div>

                            <div className=' flex-1 relative '>
                                <div className={`w-full h-full rounded-md flex items-center 
                                justify-center  ${!imagesURL.length && 'border-dashed border-4'}`}>
                                    {imagesURL.length ?
                                        <img src={URL.createObjectURL(imagesURL[selectedImage])} className='w-full h-full
                                            object-cover rounded-lg shadow-sm shadow-accent' /> :
                                        <div className='flex flex-col items-center justify-center gap-4'>
                                            <BsFillImageFill className="text-[8rem] " />
                                            <p className='text-sm'> حداقل یک عکس انتخاب کنید</p>
                                        </div>}
                                    {errors.images && <label className="label text-error absolute bottom-[-2rem] p-0">
                                        <span className="label-text-alt text-error ">{errors.images.message}</span></label>}
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div >

            <div className='fixed bottom-0 left-0 right-0 py-2 bg-base-100 rounded-b-xl'>
                <div className='flex justify-center gap-4'>
                    <button className='btn btn-success' onClick={handleErrors}>افزودن</button>
                    <button className='btn btn-error' onClick={closeModal}>انصراف</button>
                </div>
            </div>

        </div >
    )
}

export default AddModal
