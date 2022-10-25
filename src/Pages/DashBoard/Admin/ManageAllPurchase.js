import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '../../Shared/Loader';
import RemoveModal from './RemoveModal';

const ManageAllPurchase = () => {
    const [deletingPurchase, setDeletingPurchase] = useState(null);

    const { data: allPurchase, isLoading, refetch } = useQuery('allPurchase', () =>
        fetch('https://sleepy-hollows-57490.herokuapp.com/allPurchase', {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json())

    )
    if (isLoading) {
        return <Loader></Loader>
    }

    // handle Shipping
    const handleShipped = (id) => {

        // store on data base
        const shipped = {
            shipped: true
        }
        fetch(`https://sleepy-hollows-57490.herokuapp.com/allPurchase/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(shipped),
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`

            }
        })
            .then(res => res.json())
            .then(data => {
                refetch();
                toast('Shipped Successfully');
            })
    }
    return (
        <div className='mt-16'>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full border table-compact">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Purchase Product</th>
                                <th>Email</th>
                                <th>Order Amount</th>
                                <th>Number</th>
                                <th>Total Price</th>
                                <th>Pay Status</th>
                                <th>Process</th>
                                <th>Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allPurchase?.map((purchase, index) => <tr key={purchase._id}>
                                    <th>{index + 1}</th>
                                    <td>{purchase.buyerName}</td>
                                    <td>{purchase.purchaseProduct}</td>
                                    <td>{purchase.buyerEmail}</td>
                                    <td>{purchase.orderAmount}</td>
                                    <td>{purchase.phone}</td>
                                    <td>${purchase.totalPrice}</td>

                                    <td>{
                                        purchase.paid
                                            ?
                                            <p className='bg-zinc-500 cursor-pointer text-white px-3 text-center rounded py-1'>Paid</p>
                                            :
                                            <p className='bg-zinc-500 text-white text-center px-3 rounded py-1'>Unpaid</p>
                                    }
                                    </td>
                                    <td>{
                                        (purchase.paid && !purchase.shipped || !purchase.paid)
                                            ?
                                            <p onClick={() => handleShipped(purchase._id)} className='bg-zinc-500 cursor-pointer text-white px-3 text-center rounded py-1'>Pending</p>
                                            :
                                            <p className='bg-zinc-500 text-white text-center px-3 rounded py-1'>Shipped</p>
                                    }
                                    </td>
                                    <td>{(!purchase.paid) && <label for="removeModal" onClick={() => setDeletingPurchase(purchase)} className='bg-zinc-500 cursor-pointer text-white px-3 rounded py-1'>Remove</label>}</td>

                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
                {
                    deletingPurchase && <RemoveModal
                        deletingPurchase={deletingPurchase}
                        setDeletingPurchase={setDeletingPurchase}
                        refetch={refetch}
                    ></RemoveModal>
                }
            </div>
        </div>
    );
};

export default ManageAllPurchase;