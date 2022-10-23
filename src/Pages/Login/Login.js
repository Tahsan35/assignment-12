import React, { useState } from 'react';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import UseToken from '../Hooks/UseToken';
import Loader from '../Shared/Loader';

const Login = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [email, setEmail] = useState('');

    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [token] = UseToken(user || gUser);

    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password);
        console.log(data)
    };

    if (sending || gLoading || loading) {
        return <Loader />;
    }

    if (token) {
        navigate(from, { replace: true });
    }

    let signInError;
    if (error || gError) {
        signInError = <p className='text-red-600'><small>{gError?.message} || {error?.message}</small></p>
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handleRestPassword = async () => {
        await sendPasswordResetEmail(email);
        toast.success('Send Email for Password reset')
    }
    const handleGoogleSignIn = () => {
        signInWithGoogle()
    }
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='rounded-lg shadow-lg bg-white w-96  px-6'>
                <h1>
                    <h1 className='text-center font-bold text-xl'>Login</h1>
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="email">Email</label>
                    <input onChange={handleEmail}
                        className='py-[5px] w-full px-2 bg-slate-100 border border-[#CFCFCF] rounded-lg outline-none'
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Email is Required"
                            },
                            pattern: {
                                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                message: 'Provide a valid Email'
                            }
                        })} />
                    <label className="label ">
                        {errors.email?.type === 'required' && <span className='text-red-600 text-sm'>{errors.email.message}</span>}
                        {errors.email?.type === 'minLength' && <span className='text-red-600 text-sm'>{errors.email.message}</span>}
                    </label>
                    <label htmlFor="password">Password</label>
                    <input
                        className=' py-[5px] w-full px-2 bg-slate-100 border border-[#CFCFCF] rounded-lg outline-none'
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Password is Required"
                            },
                            minLength: {
                                value: 6,
                                message: 'Must be 6 characters or longer'
                            }
                        })} />
                    <label className="label">
                        {errors.password?.type === 'required' && <span className='text-red-600 text-sm'>{errors.password.message}</span>}
                        {errors.password?.type === 'minLength' && <span className='text-red-600 text-sm'>{errors.password.message}</span>}
                    </label>
                    <button onClick={handleRestPassword} className='mb-2 float-right text-red-600'>Forgotten Password ?</button>
                    {signInError}
                    <input className='w-full bg-accent mb-1 py-[5px] rounded-lg' type="submit" value='Login' />
                    <p className='text-right mb-6'>New to WebTech ? <Link className='text-red-600' to='/signup'>Create new Account</Link></p>
                    <div
                        className="flex items-center mb-7 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                    >
                        <p className="text-center font-semibold mx-4 mb-0">OR</p>
                    </div>
                    <button onClick={handleGoogleSignIn} className='uppercase w-full py-[5px] border border-black mb-7 rounded-lg'>Continue with google</button>
                </form>
            </div>
        </div>
    );
};

export default Login;