import React from 'react';
import support from '../../assets/customer-service.svg'
import delivery from '../../assets/truck.svg'
import price from '../../assets/dollar-sign.svg';
import exchange from '../../assets/money-back.svg';
const Services = () => {
    return (
        <div className='mt-  py-20 max-w-7xl mx-auto px-2'>
            <p className='text-center text-3xl font-semibold mb-10'>Services & Policy</p>
            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8 mx-auto'>
                <div className='mx-auto text-center'>
                    <img className='w-20 mx-auto mb-4' src={support} alt="" />
                    <p>Visit our Support Center</p>
                </div>
                <div className='mx-auto text-center mt-4'>
                    <img className='w-20 mx-auto mb-4' src={delivery} alt="" />
                    <p>Shipping, Delivery, Pickup</p>
                </div>
                <div className='mx-auto text-center mt-6'>
                    <img className='w-20 mx-auto mb-4' src={exchange} alt="" />
                    <p>Return Exchange</p>
                </div>
                <div className='mx-auto text-center'>
                    <img className='w-20 mx-auto mb-4' src={price} alt="" />
                    <p>Price match Guarantee</p>
                </div>

            </div>
        </div>
    );
};

export default Services;