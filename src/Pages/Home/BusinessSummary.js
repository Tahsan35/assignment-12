import React from 'react';
import CountUp from 'react-countup';
import CrossFlag from '../../assets/flags-crossed.png';
import Users from '../../assets/user.png';
import Projects from '../../assets/project.png';
import Likes from '../../assets/thumb-up.png';

const BusinessSummary = () => {
    return (
        <div className='bg-red-50'>
            <div className='mt-20 text-3xl mb-10  py-16 max-w-7xl mx-auto px-2'>
                <h1 className='text-center mb-10'>Business Summary</h1>
                <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 mx-auto'>
                    <div className='mx-auto text-center'>
                        <img className='w-20 mx-auto mb-4' src={CrossFlag} alt="" />
                        <p><CountUp end={150} /></p>
                    </div>
                    <div className='mx-auto text-center'>
                        <img className='w-20 mx-auto mb-4' src={Users} alt="" />
                        <p><CountUp end={535} />+</p>
                    </div>
                    <div className='mx-auto text-center'>
                        <img className='w-20 mx-auto mb-4' src={Projects} alt="" />
                        <p><CountUp end={237} />+</p>
                    </div>
                    <div className='mx-auto text-center'>
                        <img className='w-20 mx-auto mb-4' src={Likes} alt="" />
                        <p><CountUp end={432} />+</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessSummary;