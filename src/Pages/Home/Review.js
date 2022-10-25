import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Rating from 'react-rating';

const Review = ({ r }) => {
    const { name, img, review, rating } = r;
    {/* 
    const [slideIndex, setSlideIndex] = useState(0);
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        beforeChange: (current, next) => setSlideIndex(next),
        centerMode: true,
        autoplaySpeed: 2000
    };
*/}
    return (
        <div className=' p-2'>
            <div className='text-center'>
                <div className="avatar flex justify-center">
                    <div className="w-24  rounded-full ring ring-sky-300 ring-offset-base-100 ring-offset-">
                        <img className='' src={img} alt={name} />
                    </div>
                </div>
                <p className=' my-1'>{name}</p>
                <p className=''>
                    <Rating
                        className='text-sm'
                        initialRating={rating}
                        emptySymbol={<FontAwesomeIcon icon={faStar} />}
                        fullSymbol={<FontAwesomeIcon style={{ color: 'goldenrod' }} icon={faStar} />}
                        readonly
                    ></Rating>
                </p>
                <p>{review}</p>
            </div>
        </div>
    );
};

export default Review;