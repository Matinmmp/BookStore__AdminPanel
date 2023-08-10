import { useForm, SubmitHandler, Form } from "react-hook-form";
import { FaEyeSlash, FaEye } from 'react-icons/fa6';
import { useState } from 'react';
type Inputs = {
    username: string,
    password: string,
    rememberme: boolean
}


const index = () => {


    const { register, formState: { errors }, control } = useForm<Inputs>({});
    const [showPassword, setShowPassword] = useState(false)

    // const onSubmit: SubmitHandler<Inputs> = (data) => {
    //     reset();
    // }

    return (
        <div data-theme='light' className="w-screen h-screen bg-base-content flex flex-row overflow-hidden">

            <div className="w-full lg:w-6/12 flex justify-center items-center">
                <section className="p-4 py-8 w-[30rem] rounded-xl text-white flex flex-col gap-4 bg-neutral-focus lg:bg-base-content">

                    <div className="text-center ">
                        <h1 className="text-4xl font-bold text-white">سلام</h1>
                        <p className="mt-4">به فرم ورود مدیر خوش آمدید</p>
                    </div>
                    <Form action="/sdafdsf" className="mt-8 flex flex-col gap-4 "
                        onSuccess={() => {
                            console.log('succeess')
                        }}
                        onError={() => {
                            console.log('error')
                        }}
                        control={control}>

                        <div className="form-control w-full ">
                            <label className="label">نام کاربری</label>
                            <input type="text" placeholder="نام کاربری"
                                {...register('username', { required: "نام کاربری را وارد کنید" })}
                                className="input input-bordered w-full text-base-content" />
                            {errors.username &&
                                <label className="label text-error">
                                    <span className="label-text-alt text-error">{errors.username.message}</span>
                                </label>}
                        </div>

                        <div className="form-control w-full ">
                            <div className="flex gap-2 items-center">
                                <label className="label pb-3">رمز عبور</label>
                                <i className='cursor-pointer text-accent' onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </i>
                            </div>
                            <input type={`${showPassword ? 'text' : 'password'}`}
                                placeholder="رمز عبور" {...register("password", { required: 'رمز عبور را وارد کنید' })}
                                className="input input-bordered w-full text-base-content" />
                            {errors.password &&
                                <label className="label text-error">
                                    <span className="label-text-alt text-error">{errors.password?.message} </span>
                                </label>}
                        </div>

                        <div className="form-control">
                            <label className="cursor-pointer label flex justify-start gap-2">
                                <input type="checkbox" className="checkbox checkbox-accent" {...register("rememberme")} />
                                <span className="label-text text-white">من را به خاطر بسپار</span>
                            </label>
                        </div>

                        <button className="btn btn-md btn-accent mt-8 text-lg">ورود</button>

                    </Form>

                </section>
            </div>
            <div className="hidden lg:w-6/12 relative bg-sky-500 lg:flex items-center justify-center">

                <img src="./images/security.svg" className="object-cover" alt="" />
            </div>
        </div>
    )
}

export default index;
