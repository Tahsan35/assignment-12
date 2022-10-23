import React from 'react';
import { useForm } from 'react-hook-form';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loader from '../Shared/Loader';


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
        <div>

        </div>
    );
};

export default Signup;