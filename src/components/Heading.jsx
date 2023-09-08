import React from 'react';

const Heading = ({heading , subHeading}) => {
    return (
        <div className='text-center pt-2 pb-0'>
            <h2 className='text-3xl font-bold text-violet-600'>{heading}</h2>
            <p className='text-gray-600 font-semibold'>{subHeading}</p>
        </div>
    );
};

export default Heading;