import React from 'react';

const Loader = () => {
    return (
        <div className='flex justify-center items-center h-[93vh]'>
            <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin">
            </div>
        </div>
    );
};

export default Loader;