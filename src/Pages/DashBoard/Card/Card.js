import { Table } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cartHeader from '../../../assets/breadcrumb.jpeg';
import { MdOutlineDoubleArrow } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
const Card = () => {
    const [count, setCount] = useState(1);
    const navigate = useNavigate();
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 1,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 2,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 3,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 4,
            render: () =>
                <div className='flex w-36 bg-[#679509] border-[#679509] p-[2px]'>
                    <button disabled={count <= 0} onClick={() => setCount(count - 1)} className='px-2 text-3xl  text-white' >-</button>
                    <input className='outline-0 w-20 px-8' type="text" value={count} />
                    <button onClick={() => setCount(count + 1)} className='px-1  text-3xl text-center text-white'>+</button>
                </div>
        },
        {
            title: 'Sub Total',
            dataIndex: 'sub total',
            key: 5,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 6,
            render: () => <button className='text-xl w-8 h-8 rounded-full flex items-center p-2 font-bold bg-red-100 text-red-500'><FaTrashAlt /></button>,
        },
    ];
    const data = [];

    for (let i = 0; i < 5; i++) {
        data.push({
            key: i,
            name: `Edward King ${i}`,
            age: 32,
            address: `London, Park Lane no. ${i}`,
        });
    }
    return (
        <div>
            <div className='pb-12'>
                <div className='relative'>
                    <img src={cartHeader} alt="" />
                    <div className=" absolute bottom-0  text-center w-full h-full flex justify-center items-center">
                        <div className='flex gap-8'>
                            <div>
                                <h1 className="text-4xl font-bold text-white">Cart</h1>
                                <h5 className='flex items-center gap-4 text-2xl text-white'>Home <MdOutlineDoubleArrow className='mt-2' /> Cart</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='max-w-7xl mx-auto'>
                    {/* table */}
                    <div className='mt-9'>
                        <Table
                            style={{ "backgroundColor": "#4d4d4d" }}
                            columns={columns}
                            dataSource={data}
                            pagination={false}
                        />
                    </div>
                    <div className='my-7 flex flex-col justify-between gap-3 text-xl items-center sm:flex-row'>
                        <button className='hover:bg-[#2a660a] transition ease-in-out px-4 py-1 bg-[#679509] text-white'>Continue Shopping</button>
                        <button className='hover:bg-[#2a660a] transition ease-in-out px-4 py-1 bg-[#679509] text-white'>Update Cart</button>
                    </div>
                    <div className='flex justify-center gap-10 flex-col-reverse md:flex-row'>
                        <div className='border bg-[#f8f8f8] mb-10 w-full '>
                            <p className='border-b-[1px] p-3 font-bold text-lg'>User Coupon Code</p>
                            <p className='text-md px-3'>Have a Coupon Code ?</p>
                            <input className='outline-0 py-2 px-4 mx-3' type="text" placeholder='xxx' /> <br />
                            <button className='bg-[#679509] text-white mx-3 px-7 py-2 mt-5'>Apply</button>
                        </div>
                        <div className='border w-full '>
                            <p className='text-lg font-bold border-b-[1px] p-3 bg-[#f0f0f0]'>Order Total </p>
                            <p className='text-lg font-bold px-3 flex justify-between'>Sub Total <span className='text-[#7f9195]'>$50</span></p>
                            <p className='text-lg font-bold px-3 flex justify-between'>Taxes <span className='text-[#7f9195]'>$50</span></p>
                            <hr />
                            <p className='text-lg font-bold mt-4 px-3 flex justify-between'>Grand Total <span className='text-[#7f9195]'>$50</span></p>

                            <button onClick={() => navigate('/checkout')} className='bg-[#679509] text-white w-full py-2 font-bold text-md'>PROCEED TO CHECKOUT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;