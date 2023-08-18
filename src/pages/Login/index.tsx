import { useForm, SubmitHandler } from "react-hook-form";
import { FaEyeSlash, FaEye } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import publicAxios from "../../services/instance/publiceAxios";
import Cookies from 'js-cookie';
import { MainContext } from "../../context/Store";
type Inputs = {
    username: string,
    password: string,
    rememberme: boolean
}


const index = () => {

    const { register, reset, formState: { errors }, handleSubmit } = useForm<Inputs>();
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();
    const {getUser} = useContext(MainContext);
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const user = {
            username: data.username,
            password: data.password
        }
        publicAxios.post('/auth/login', user).then(res => {
            Cookies.set('accessToken', res.data.token.accessToken);
            Cookies.set('refreshToken', res.data.token.accessToken);
            getUser(res.data.data.user);
            navigate('/admin/home');
        })
        reset();
    }

    return (
        <div data-theme='light' className="w-screen h-screen bg-base-content flex flex-row overflow-hidden p-4 lg:p-0">

            <div className="w-full lg:w-6/12 flex justify-center items-center">

                <section className="p-4 py-8 w-[30rem] rounded-xl text-white flex 
                flex-col gap-4 shadow-xl shadow-gray-900 lg:shadow-none">

                    <div className="text-center ">
                        <h1 className="text-4xl font-bold text-white">سلام</h1>
                        <p className="mt-4">به فرم ورود مدیر خوش آمدید</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col " >

                        <div className="form-control w-full relative pb-7">
                            <label className="label">نام کاربری</label>
                            <input type="text" placeholder="نام کاربری"
                                {...register('username', { required: "نام کاربری را وارد کنید" })}
                                className="input input-bordered input-accent w-full text-base-content" />
                            {errors.username &&
                                <label className="label text-error absolute bottom-0">
                                    <span className="label-text-alt text-error">{errors.username.message}</span>
                                </label>}
                        </div>

                        <div className="form-control w-full relative pb-7">
                            <div className="flex gap-2 items-center">
                                <label className="label pb-3">رمز عبور</label>
                                <i className='cursor-pointer text-accent' onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </i>
                            </div>
                            <input type={`${showPassword ? 'text' : 'password'}`}
                                placeholder="رمز عبور" {...register("password", { required: 'رمز عبور را وارد کنید' })}
                                className="input input-bordered w-full text-base-content input-accent" />
                            {errors.password &&
                                <label className="label text-error absolute bottom-0">
                                    <span className="label-text-alt text-error">{errors.password?.message} </span>
                                </label>}
                        </div>

                        {/* <div className="form-control">
                            <label className="cursor-pointer label flex justify-start gap-2">
                                <input type="checkbox" className="checkbox checkbox-accent" {...register("rememberme")} />
                                <span className="label-text text-white">من را به خاطر بسپار</span>
                            </label>
                        </div> */}

                        <button className="btn btn-md btn-accent mt-8 text-lg">ورود</button>

                    </form>

                </section>

            </div>

            <div className="hidden lg:w-6/12 relative bg-sky-500 lg:flex items-center justify-center">
                <img src="../images/security.svg" className="object-cover" alt="" />
            </div>
        </div>
    )
}

export default index;
