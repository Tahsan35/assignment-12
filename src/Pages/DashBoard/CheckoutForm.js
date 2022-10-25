import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';


const CheckoutForm = ({ purchase }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState('');


    const { totalPrice, buyerName, buyerEmail, _id } = purchase;
    useEffect(() => {
        fetch('https://sleepy-hollows-57490.herokuapp.com/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ totalPrice })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret);
                }
            });
    }, [totalPrice]);


    const handleSubmit = async (event) => {
        event.preventDefault();


        if (!stripe || !elements) {
            return;
        }


        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod(
            // clientSecret,
            {
                type: 'card',
                card
            });

        if (error) {
            setCardError(error.message);
        } else {
            setCardError('')
            console.log('[PaymentMethod]', paymentMethod);
        }

        setCardError(error?.message || '')
        setSuccess('')
        setProcessing(true)
        // confirm payment 
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: buyerName,
                        email: buyerEmail
                    },
                },
            },
        );
        if (intentError) {
            setCardError(intentError?.message);
            setProcessing(false);
        }
        else {
            setCardError('');
            setSuccess('Your Payment is Completed');
            setTransactionId(paymentIntent.id);

            // store on data base
            const payment = {
                purchase: _id,
                transactionId: paymentIntent.id
            }
            fetch(`https://sleepy-hollows-57490.herokuapp.com/purchase/${_id}`, {
                method: 'PATCH',
                body: JSON.stringify(payment),
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setProcessing(false)
                    console.log(data);
                })
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='bg-zinc-500 mt-5 px-5 text-white rounded-lg' type="submit" disabled={!stripe || !clientSecret}>Pay</button>
            </form>
            {
                cardError && <p className='text-red-500'>{cardError}</p>
            }
            {
                success && <div>
                    <p className='text-green-500'>{success}</p>
                    <p className='text-green-500'>TransactionId:  {transactionId}</p>
                </div>
            }
        </div>
    );
};
