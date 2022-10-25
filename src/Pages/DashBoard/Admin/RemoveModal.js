import React from 'react';
import { toast } from 'react-toastify';

const RemoveModal = ({ deletingPurchase, refetch, setDeletingPurchase }) => {
    const { _id, purchaseProduct } = deletingPurchase;

    // handle Remove unpaid purchase
    const handleRemove = (id) => {
        fetch(`https://sleepy-hollows-57490.herokuapp.com/allPurchase/${_id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`

            }
        })
            .then(res => res.json())
            .then(data => {
                refetch();
                toast('Delete Successfully');
                setDeletingPurchase(null)
            })
    }
    return (
        <div>

            <input type="checkbox" id="removeModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <h3 className="text-lg font-bold">Are you sure to delete this Purchase:-  {purchaseProduct}</h3>

                    <p className='my-5'>If you Delete This Purchase that item remove from Database</p>
                    <div className='flex gap-3 justify-end'>
                        <label onClick={handleRemove} className="btn">Delete</label>
                        <label htmlFor="removeModal" className="btn">Close</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RemoveModal;