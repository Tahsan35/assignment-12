import React from 'react';
import { toast } from 'react-toastify';

const CancelPurchaseModal = ({ setCancelPurchase, refetch, cancelPurchase }) => {
    const { name, _id } = cancelPurchase;

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
                setCancelPurchase(null)
            })
    }
    return (
        <div>
            <input type="checkbox" id="cancelModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="cancelModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Are you sure to delete this Purchase:- {name}</h3>
                    <p className='my-5'>If you Delete This Purchase that item remove from Database</p>
                    <div className='flex gap-3 justify-end'>
                        <label onClick={() => handleRemove(_id)} className="btn">Delete</label>
                        <label htmlFor="cancelModal" className="btn">Close</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CancelPurchaseModal;