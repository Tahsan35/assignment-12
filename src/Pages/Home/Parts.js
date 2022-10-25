import React, { useEffect, useState } from 'react';
import Part from './Part';

const Parts = () => {
    const [parts, setParts] = useState([]);

    useEffect(() => {
        fetch('https://sleepy-hollows-57490.herokuapp.com/parts', {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setParts(data)
            })
    }, [parts])

    return (
        <div className='mt-20 max-w-7xl mx-auto px-2'>
            <h1 className='text-center text-3xl mb-10'>Available Parts</h1>
            <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'>
                {
                    parts?.map(part => <Part
                        key={part._id}
                        part={part}>
                    </Part>)
                }
            </div>
        </div>
    );
};

export default Parts;