import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
// import Review from './Review';
import '../Style/Review.css'
import Rating from 'react-rating';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';


const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [slideIndex, setSlideIndex] = useState(0);
    useEffect(() => {
        fetch('https://sleepy-hollows-57490.herokuapp.com/reviews')
            .then(res => res.json())
            .then(data => setReviews(data));
    }, []);
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        beforeChange: (current, next) => setSlideIndex(next),
        centerMode: true,
        autoplaySpeed: 1000
    };
    return (
        <div className='mt-20 max-w-7xl mx-auto px-2'>
            <h1 className='text-center text-3xl mb-10'>Customers FeedBack </h1>
            <div className="slider">
                <Slider {...settings}>
                    {
                        reviews.map((review, index) => (
                            <div className={index === slideIndex ? 'slide slide-active' : 'slide'} key={index}>
                                <div className='shadow-lg p-4'>
                                    <img className='w-24 h-24 rounded-full pb-4 mx-auto' src={review.img} alt="" />
                                    <p className='text-black text-center'>{review.name}</p>
                                    <p className='text-center'>
                                        <Rating
                                            className='text-sm'
                                            initialRating={review.rating}
                                            emptySymbol={<FontAwesomeIcon icon={faStar} />}
                                            fullSymbol={<FontAwesomeIcon style={{ color: 'goldenrod' }} icon={faStar} />}
                                            readonly
                                        ></Rating>
                                    </p>
                                    <p className='text-black'>{review.review}</p>
                                </div>
                            </div>
                        ))
                    }
                </Slider>
            </div>
            {/* <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
                {
                    reviews?.map(r => <Review
                        key={r._id}
                        r={r}
                    ></Review>)
                }
            </div> */}
        </div>
    );
};

export default Reviews;