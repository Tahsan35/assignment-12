import React from 'react';
import cartHeader from '../assets/breadcrumb.jpeg';
import { MdOutlineDoubleArrow } from 'react-icons/md';
import './Style/Checkout.css';

const Checkout = () => {
    return (
        <div className='bg-[#f8f8f8] pb-12'>
            <div>
                <div className='relative'>
                    <img src={cartHeader} alt="" />
                    <div className=" absolute bottom-0  text-center w-full h-full flex justify-center items-center">
                        <div className='flex gap-8'>
                            <div>
                                <h1 className="text-4xl font-bold text-white">Checkout</h1>
                                <h5 className='flex items-center gap-4 text-2xl text-white'>Home <MdOutlineDoubleArrow className='mt-2' /> Checkout</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-10 md:flex-row justify-between max-w-7xl mx-auto px-2 mt-16'>
                <div className='billingCard'>
                    <div className='grid grid-cols-1 gap-6'>
                        <p className='font-bold text-xl mb-0'>Billing Address</p>
                        <hr className='' />
                        <div className='grid grid-cols-1 md:grid-cols-2  gap-5 '>
                            <div className=''>
                                <label htmlFor="First Name" className='text-[15px]'>First Name <span className='text-red-500'>*</span></label>
                                <input className='inputItem' name='firstName' type="text" />
                            </div>
                            <div>
                                <label htmlFor="Last Name" className='text-[15px]'>Last Name <span className='text-red-500'>*</span></label>
                                <input className='inputItem' name='lastName' type="text" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="" className='text-[15px]'>Email <span className='text-red-500'>*</span></label>
                            <input className='inputItem' name='email' type="text" />
                        </div>
                        <div>
                            <label htmlFor="" className='text-[15px]'>Phone <span className='text-red-500'>*</span></label>
                            <input className='inputItem' name='phone' type="text" />
                        </div>
                        <div>
                            <label htmlFor="" className='text-[15px]'>Address <span className='text-red-500'>*</span></label>
                            <input className='inputItem' name='address' type="text" />
                        </div>
                        <div>
                            <label htmlFor="" className='text-[15px]'>Zip <span className='text-red-500'>*</span></label>
                            <input className='inputItem' name='zip' type="number" />
                        </div>
                        <div className='flex gap-3 items-center'>
                            <input className='' type="checkbox" />
                            <label htmlFor="" className='text-[15px]'>Ship to a different address?</label>
                        </div>
                        <div>
                            <label htmlFor="" className='text-[15px]'>Order notes (Optional)</label>
                            <textarea className='inputItem' name='textNote' type="text" />
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-1 gap-4 w-full'>
                    <div className='billingCard'>
                        <div className=''>
                            <p className='font-bold text-2xl mb-0 pb-4'>Checkout Summary</p>
                            <hr className='pb-6' />
                            <p className='text-[#747e88] flex justify-between text-lg pb-3 border-b-[1px]'>Sub Total <span>$530.00</span></p>
                            <p className='text-[#747e88] flex justify-between text-lg pb-3 border-b-[1px]'>Shipping <span>$530.00</span></p>
                            <p className='text-[#747e88] flex justify-between text-lg pb-3 border-b-[1px]'>Coupon <span>$530.00</span></p>
                            <p className='text-[#747e88] flex justify-between text-lg pb-3 border-b-[1px]'>Total <span>$530.00</span></p>
                            <p className='text-[#666666] flex justify-between font-bold text-lg'>Payable Total<span>$530.00</span></p>
                        </div>
                    </div>
                    <div className='billingCard'>
                        <p className='font-bold text-2xl mb-0 pb-4'>Payment Method</p>
                        <hr className='pb-6' />
                        <div className='grid grid-cols-1 gap-2'>
                            <div className='flex gap-3 items-center'>
                                <input className='' type="checkbox" />
                                <label htmlFor="" className='text-[15px]'>Direct bank transfer</label>
                            </div>
                            <div className='flex gap-3 items-center'>
                                <input className='' type="checkbox" />
                                <label htmlFor="" className='text-[15px]'>Cash on delivery</label>
                            </div>
                            <div className='flex gap-3 items-center'>
                                <input className='' type="checkbox" />
                                <label htmlFor="" className='text-[15px]'>Check payments</label>
                            </div>
                            <div className='flex gap-3 items-center'>
                                <input className='' type="checkbox" />
                                <label htmlFor="" className='text-[15px]'>PayPal</label>
                            </div>
                            <button className='bg-[#679509] text-white hover:bg-[#2a660a] text-lg px-6 py-2' >Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;