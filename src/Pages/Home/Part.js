import React from 'react';
import { Link } from 'react-router-dom';

const Part = ({ part }) => {
    const { name, img, price, info, orderQuantity, quantity, _id } = part;
    return (
        <div className='shadow-xl'>
            <img className='max-w-[200px] mx-auto' src={img} alt="" />
            <div className='pl-2'>
                <p>{name}</p>
                <p className='my-3'>{info?.slice(0, 62) + '..'}</p>
                <p>Order Quantity: {orderQuantity}</p>
                <p>Available Quantity: {quantity}</p>
                <p>Price per Unit: <span className='font-bold'>${price}</span></p>
            </div>

            <Link to={`/purchase/${_id}`}>
                <button
                    className='bg-accent uppercase text-white w-full px-2 py-[4px]'
                >purchase</button>
            </Link>
        </div>
    );
};

export default Part;