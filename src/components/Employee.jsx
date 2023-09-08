import React from 'react';
import useUsers from '../hooks/useUsers';

const Employee = () => {

    const [users, ,] = useUsers();
    console.log(users)

    return (
        <div className="overflow-x-auto animate__animated animate__fadeIn">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">User Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Profile Picture</th>
                        <th className="py-2 px-4 border-b">Bio</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-b">{user?.userName}</td>
                            <td className="py-2 px-4 border-b">{user?.email}</td>
                            <td className="py-2 px-4 border-b">
                                <img src={user?.profilePicture} alt="Profile" className="w-10 h-10 rounded-full" />
                            </td>
                            <td className="py-2 px-4 border-b">{user?.bio}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Employee;