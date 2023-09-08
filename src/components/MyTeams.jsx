import React, { useContext } from 'react';
import useUser from '../hooks/useUser';
import { AuthContext } from './Provider/AuthProvider';

const MyTeams = () => {
    const { user } = useContext(AuthContext)
    const [userInfo, ,] = useUser(user?.email)
    const { myTeams } = userInfo;
    console.log(myTeams)

    let teams=[];

    myTeams?.map((id) => {
        fetch(`http://localhost:5000/singleTeam/${id}`)
            .then(res => res.json())
            .then(result => {
                console.log(result)
                teams.push(result)
            })
    })
    console.log(teams)

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
                    
                       
                        
                    
                    {/* <tr>
                                    <th>{index + 1}</th>
                                    <td>{result1?.teamName}</td>
                                    <td className='flex '>
                                        <button className=' btn bg-orange-500'>Decline</button>
                                    </td>

                                </tr> */}
                </tbody>

            </table>
        </div>
    );
};

export default MyTeams;