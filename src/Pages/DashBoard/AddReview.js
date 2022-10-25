import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddReview = () => {
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
                    const review = {
                        name: data.name,
                        rating: data.rating,
                        review: data.review,
                        img: img
                    }
                    fetch('https://sleepy-hollows-57490.herokuapp.com/reviews', {
                        method: "POST",
                        body: JSON.stringify(review),
                        headers: {
                            'Content-type': 'application/json'
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            toast.success('Review Added Successfully');
                            reset();
                        })
                }
                else {
                    toast.error('Failed add to Review')
                }

            })
    }
    return (
        <div className='mt-16'>
            <div className="card w-96 bg-base-100 shadow-xl mx-auto">
                <div className="card-body">
                    <h2 className="card-title">Add Review</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full max-w-xs">
                            <input
                                type="text"
                                placeholder="Enter Name"
                                className="input input-bordered w-full max-w-xs"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: 'Name is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <input
                                type="number"
                                placeholder="Enter Ratings"
                                className="input input-bordered w-full max-w-xs"
                                {...register("rating", {
                                    required: {
                                        value: true,
                                        message: 'Ratings is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.rating?.type === 'required' && <span className="label-text-alt text-red-500">{errors.rating.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <input
                                type="text"
                                placeholder="Enter Review"
                                className="input input-bordered w-full max-w-xs"
                                {...register("review", {
                                    required: {
                                        value: true,
                                        message: 'Review is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.review?.type === 'required' && <span className="label-text-alt text-red-500">{errors.review.message}</span>}
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
                        <input className='btn w-full max-w-xs text-white' type="submit" value="Add Review" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddReview;