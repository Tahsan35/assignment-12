import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const PurchaseModal = ({ purchase, setPurchase, refetch }) => {
    const { name, orderQuantity, quantity, _id, price } = purchase;
    const [user] = useAuthState(auth);

    // function for update quantity after buyer purchase
    const handleQuantity = ([quantity, orderAmount]) => {
        const newQuantity = parseInt(quantity) - parseInt(orderAmount);

        fetch(`https://sleepy-hollows-57490.herokuapp.com/parts/${_id}`, {
            method: "PUT",
            body: JSON.stringify({ newQuantity: newQuantity }),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                refetch();
            });
    }

    // handle purchase function
    const handleSubmit = event => {
        event.preventDefault();
        const orderAmount = event.target.quantity.value
        const totalPrice = price;
        if (orderAmount < orderQuantity) {
            return alert('please Enter Order Quantity 500 or Longer');
        }

        if (quantity < orderAmount) {
            return toast('You order more then Available Quantity');
        }
        handleQuantity([quantity, orderAmount]);

        const purchase = {
            purchaseProduct: event.target.productName.value,
            buyerName: event.target.name.value,
            buyerEmail: event.target.email.value,
            orderAmount,
            totalPrice,
            phone: event.target.phone.value,
        }
        fetch('https://sleepy-hollows-57490.herokuapp.com/purchase', {
            method: "POST",
            body: JSON.stringify(purchase),
            headers: {
                'Content-type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    toast.success('Purchase Item Successfully');
                    setPurchase(null);
                    refetch();
                } else {
                    toast.error('Try Again')
                }
            })
    };
    return (
        <div>
            <input type="checkbox" id="purchaseModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="purchaseModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Purchase for {name}</h3>
                    <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-3 justify-items-center mt-2'>
                        <input type="text" name="productName" disabled value={name} className="input input-bordered w-full max-w-xs" />
                        <input type="text" name="name" disabled value={user?.displayName || ''} className="input input-bordered w-full max-w-xs" />
                        <input type="text" name="email" disabled value={user?.email || ''} className="input input-bordered w-full max-w-xs" />
                        <input required type="number" name="quantity" min={orderQuantity} placeholder={`Minimum Order Quantity ${orderQuantity}`} className="input input-bordered w-full max-w-xs" />
                        <input required type="number" name="phone" placeholder='Phone Number' className="input input-bordered w-full max-w-xs" />
                        <input
                            disabled={quantity === 0}
                            type="submit"
                            value="Purchase"
                            className="input cursor-pointer input-bordered w-full max-w-xs bg-[#3A4256] text-white" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PurchaseModal;