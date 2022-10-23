import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loader from '../Shared/Loader';
import useToken from '../Hooks/UseToken';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Signup = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [signInWithGoogle, gUser, GLoading, gError] = useSignInWithGoogle(auth);
    const [updateProfile, updating, updatingError] = useUpdateProfile(auth);

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [token] = useToken(user || gUser);
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const onSubmit = async data => {
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name })
    };
    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, from, navigate]);


    if (loading || GLoading || updating) {
        return <Loader />
    }

    let signInError;
    if (error || gError || updatingError) {
        signInError = <p className='text-red-600'><small>{gError?.message} || {error?.message}</small></p>
    }
    const handleGoogleSignIn = () => {
        signInWithGoogle()
    }
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='rounded-lg shadow-lg bg-white w-96  px-6'>
                <h1>
                    <h1 className='text-center font-bold text-xl'>Create new Account</h1>
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="name">Name</label>
                    <input
                        className='py-[5px] w-full px-2 bg-slate-100 border border-[#CFCFCF] rounded-lg outline-none'
                        type="name"
                        {...register("name", {
                            required: {
                                value: true,
                                message: 'Name is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className='text-red-600 text-sm'>{errors.name.message}</span>}
                    </label>
                    <label htmlFor="email">Email</label>
                    <input
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
                        type='password'
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
                    {signInError}
                    <input className='w-full bg-accent mb-1 py-[5px] rounded-lg ' type="submit" value='Signup' />
                    <p className='text-right mb-6'>Already have an account ? <Link className='text-red-600' to='/login'>Login</Link></p>
                    <div
                        className="flex items-center mb-7 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                    >
                        <p className="text-center font-semibold mx-4 mb-0">OR</p>
                    </div>
                    <div>
                        <button onClick={handleGoogleSignIn} className='uppercase w-full py-[5px] border border-black mb-7 rounded-lg'>Continue with google</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;