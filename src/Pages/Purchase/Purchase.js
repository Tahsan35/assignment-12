import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Shared/Loader';
import PurchaseModal from './PurchaseModal';
const Purchase = () => {
    const { id } = useParams()
    const [purchase, setPurchase] = useState(null);


    const { data: product, isLoading, refetch } = useQuery('parts', () =>
        fetch(`https://sleepy-hollows-57490.herokuapp.com/parts/${id}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json())

    )
    if (isLoading) {
        return <Loader></Loader>
    }
    const { name, img, price, info, orderQuantity, quantity, _id } = product;

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="card w-72 md:w-96 bg-base-100 shadow-xl image-full mx-auto">
                <figure><img src={img} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <div>
                        <p className='mb-2'>{info}</p>
                        <p className='mb-1'>Order Quantity: {orderQuantity}</p>
                        <p className='mb-1'>Available Quantity: {quantity}</p>
                        <p>Price per Unit: <span className='font-bold'>${price}</span></p>
                    </div>
                    <div className="card-actions justify-end">
                        <label
                            onClick={() => setPurchase(product)}
                            htmlFor="purchaseModal"
                            className='btn bg-cyan-500 hover:bg-cyan-600 cursor-pointer text-center uppercase'
                        >purchase</label>
                    </div>
                </div>
            </div>
            {purchase && <PurchaseModal
                purchase={purchase}
                setPurchase={setPurchase}
                refetch={refetch}
            ></PurchaseModal>}
        </div>
    );
};

export default Purchase;