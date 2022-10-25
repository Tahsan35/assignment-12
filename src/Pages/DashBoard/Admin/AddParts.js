import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddParts = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const imagesStorageKey = 'abd7b79a50a5c7cfbfaf7b71ee36e9be';
    const onSubmit = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);

        const url = `https://api.imgbb.com/1/upload?key=${imagesStorageKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url;
                    const parts = {
                        name: data.parts,
                        quantity: data.availableQuantity,
                        orderQuantity: data.orderQuantity,
                        price: data.price,
                        img: img
                    }
                    fetch('https://sleepy-hollows-57490.herokuapp.com/parts', {
                        method: "POST",
                        body: JSON.stringify(parts),
                        headers: {
                            'content-type': 'application/json',
                            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                        }
                    })
                        .then(res => {
                            if (res.status === 401 || res.status === 403) {
                                toast('Fail to Add Parts')
                            }
                            return res.json()
                        })
                        .then(data => {
                            toast.success('Parts Added Successfully');
                            reset();
                        })
                }
                else {
                    toast.error('Failed add to Parts')
                }

            })
    }
    return (
        <div className='mt-16'>
            <div className="card w-96 bg-base-100 shadow-xl mx-auto">
                <div className="card-body">
                    <h2 className=" text-2xl font-semibold text-center mb-6">Add Parts</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full max-w-xs">
                            <input
                                type="text"
                                placeholder="Enter Parts Name"
                                className="input input-bordered w-full max-w-xs"
                                {...register("parts", {
                                    required: {
                                        value: true,
                                        message: 'Parts Name is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.parts?.type === 'required' && <span className="label-text-alt text-red-500">{errors.parts.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <input
                                type="number"
                                placeholder="Enter Order Quantity"
                                className="input input-bordered w-full max-w-xs"
                                {...register("orderQuantity", {
                                    required: {
                                        value: true,
                                        message: 'Order Quantity is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.orderQuantity?.type === 'required' && <span className="label-text-alt text-red-500">{errors.orderQuantity.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <input
                                type="number"
                                placeholder="Enter Total Available Quantity"
                                className="input input-bordered w-full max-w-xs"
                                {...register("availableQuantity", {
                                    required: {
                                        value: true,
                                        message: 'Available Quantity is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.availableQuantity?.type === 'required' && <span className="label-text-alt text-red-500">{errors.availableQuantity.message}</span>}
                            </label>
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <input
                                type="number"
                                placeholder="Enter Price"
                                className="input input-bordered w-full max-w-xs"
                                {...register("price", {
                                    required: {
                                        value: true,
                                        message: 'Price is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.price?.type === 'required' && <span className="label-text-alt text-red-500">{errors.price.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <input
                                type="file"
                                className="input input-bordered w-full max-w-xs pt-[6px]"
                                {...register("image", {
                                    required: {
                                        value: true,
                                        message: 'Image is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.image?.type === 'required' && <span className="label-text-alt text-red-500">{errors.image.message}</span>}
                            </label>
                        </div>
                        <input className='btn w-full max-w-xs text-white' type="submit" value="Add Parts" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddParts;