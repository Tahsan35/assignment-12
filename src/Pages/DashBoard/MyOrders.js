import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import Loader from '../Shared/Loader';
import CancelPurchaseModal from './CancelPurchaseModal'

const MyOrders = () => {
    const [cancelPurchase, setCancelPurchase] = useState(null);
    const [user] = useAuthState(auth);

    const email = user?.email;
    const { data: orders, isLoading, refetch } = useQuery('orders', () =>
        fetch(`https://sleepy-hollows-57490.herokuapp.com/purchase?email=${email}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json())

    )
    if (isLoading) {
        return <Loader></Loader>
    }
    /* useEffect(() => {
        const getPurchaseItem = async () => {
            const email = user?.email;
            fetch(`https://sleepy-hollows-57490.herokuapp.com/purchase?email=${email}`, {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(res => res.json())
            .then(data => setOrders(data));
        }
        getPurchaseItem()
        
    }, []); */
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
                                <th>Payment</th>
                                <th>Transaction ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders?.map((order, index) => <tr>
                                    <th>{index + 1}</th>
                                    <td>{order.buyerName}</td>
                                    <td>{order.purchaseProduct}</td>
                                    <td>{order.buyerEmail}</td>
                                    <td>{order.orderAmount}</td>
                                    <td>{order.phone}</td>
                                    <td>${order.totalPrice}</td>

                                    <td>{
                                        (order.totalPrice && !order.paid)
                                            ?
                                            <Link to={`/dashboard/payment/${order._id}`}><p className='bg-zinc-500 text-white px-3 text-center rounded py-1'>Payment</p></Link>
                                            :
                                            <p className='bg-zinc-500 text-white text-center px-3 rounded py-1'>Paid</p>
                                    }
                                    </td>
                                    <td>{order.transactionId}</td>
                                    <td>{
                                        !order.paid &&
                                        <label
                                            onClick={() => setCancelPurchase(order)}
                                            htmlFor="cancelModal"
                                            className="bg-zinc-500 cursor-pointer text-white px-3 text-center rounded py-1">
                                            Cancel</label>
                                    }
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                    {
                        cancelPurchase && <CancelPurchaseModal
                            setCancelPurchase={setCancelPurchase}
                            cancelPurchase={cancelPurchase}
                            refetch={refetch}
                        ></CancelPurchaseModal>
                    }
                </div>
            </div>
        </div>
    );
};

export default MyOrders;