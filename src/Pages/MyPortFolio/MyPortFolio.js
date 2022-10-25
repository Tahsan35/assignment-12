import React from 'react';

const MyPortFolio = () => {
    return (
        <div>
            <div className='flex justify-center items-center h-screen'>
                <div className='w-[450px] border mx-auto rounded-xl p-6 grid grid-cols-1 gap-1'>
                    <p className='text-lg'>Name: Tahsan Shakil</p>
                    <p className=''>Email: tahsanshakil531@gmail.com</p>
                    <p className=''>Education: Department of Sociology at Dhaka College</p>
                    <p className=''>Skill: HTML5, Tailwind, CSS3, JavaScript, React.Js, MERN Stack Also</p>

                    <span className=''>My Project :</span>
                    <div className='pl-10'>
                        <span><a className='underline text-blue-700' href="https://tahsan-portfolio.netlify.app/">My portfolio</a></span><br />
                        <span><a className='underline text-blue-700' href="https://darling-chebakia-e9b607.netlify.app/">perfume ware house</a></span><br />
                        <span><a className='underline text-blue-700' href="https://ema-john-second.netlify.app/">ema john</a></span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MyPortFolio;