import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Shared/Loader';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
const stripePromise = loadStripe('pk_test_51LwdJnKudDzyzJCqhCMgCA9Uu9Y82XGEBj3lMqHIql7eNWJiNgKdIJqY5FnxOqGKeVT0Z9JhTrhaeHBp8nu69NIm00OVQBP0VJ');

const Payment = () => {
    const { id } = useParams();

    const { data: purchase, isLoading } = useQuery(['purchase', id], () =>
        fetch(`https://sleepy-hollows-57490.herokuapp.com/purchase/${id}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json()))

    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <div>
            <div className=" w-50 max-w-md mx-auto  bg-base-100 shadow-xl rounded-xl my-12">
                <div className="text-left p-8 ">
                    <p className="text-success font-bold  text-center mb-6">Hello, {purchase?.buyerName}</p>
                    <h2 className="card-title">Please Pay for {purchase?.purchaseProduct}</h2>
                    <p>Your Appointment: <span className='text-orange-700'></span> at </p>
                    <p>Please pay: $<span className='text-xl font-semibold'>{purchase?.totalPrice}</span></p>
                </div>
            </div>
            <div className="card flex-shrink-0 w-50 mx-auto  max-w-md shadow-2xl bg-base-100">
                <div className="card-body text-left">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm purchase={purchase} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;