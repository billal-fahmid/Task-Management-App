import React, { useContext } from 'react';
import { AuthContext } from '../components/Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const {user, loading} = useContext(AuthContext);

    const location = useLocation();

    if (loading) {
        return <>
            <div className='min-h-screen text-center '>
                <progress className="progress w-96 mt-24"></progress>
            </div>
        </>
    }
    if (user) {
        return children
    }

    return <Navigate state={{ from: location }} to='/signin' replace></Navigate>

};

export default PrivateRoute;