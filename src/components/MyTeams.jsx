import React, { useContext, useEffect } from 'react';
import useUser from '../hooks/useUser';
import { AuthContext } from './Provider/AuthProvider';
import { useState } from 'react';

const MyTeams = () => {
    const { user } = useContext(AuthContext)
    const [userInfo, ,] = useUser(user?.email)
    const { myTeams } = userInfo;
    console.log(myTeams)



    const [teams, setTeams] = useState([])


    useEffect(() => {
        myTeams?.map((id) => {
            fetch(`http://localhost:5000/singleTeam/${id}`)
                .then(res => res.json())
                .then(result => {
                    console.log(result)
                    setTeams([result, ...teams])
                })
        })
    }, [myTeams])
    console.log(teams)
    // console.log(teams1)



    return (
        <div>
            <h2>My Teams</h2>

            <table className="table table-xs ">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Team Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>


                    {
                        teams?.map((team,index) =>
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{team?.teamName}</td>
                                <td className='flex '>
                                    <button className=' btn bg-orange-500'>See </button>
                                </td>

                            </tr>)
                    }
                </tbody>

            </table>
        </div>
    );
};

export default MyTeams;