import React from 'react';
import Heading from './Heading';
import { useContext } from 'react';
import { AuthContext } from './Provider/AuthProvider';
import useUser from '../hooks/useUser';

const TeamRequest = () => {
    const { user } = useContext(AuthContext);

    const [userInfo, , refetch] = useUser(user.email)
    console.log(userInfo)

    const teamRequest = userInfo.teamRequest;

    const handleJoin = (id) => {
        const newTeamRequest = teamRequest.filter(request => request.teamId !== id);
        console.log(newTeamRequest)
        fetch(`http://localhost:5000/user/update/${userInfo._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ teamRequest: newTeamRequest })
        })
            .then(res => res.json())
            .then(data => {
                refetch()
                fetch(`http://localhost:5000/singleTeam/${id}`)
                    .then(res => res.json())
                    .then(result1 => {
                        console.log(result1.teamMember)
                        let findMember = result1?.teamMember.find(member => member.id === userInfo._id)
                        const updateMember = result1?.teamMember.filter(member => member.id !== userInfo._id)
                        findMember.status = 'accepted'
                        updateMember.push(findMember)
                        console.log(updateMember)
                        fetch(`http://localhost:5000/teamUpdate/${id}`, {
                            method: 'PATCH',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify({ newTeamMember: updateMember })
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data)
                                userInfo.myTeams.push(id)
                                fetch(`http://localhost:5000/update/myTeams/${userInfo._id}`, {
                                    method: 'PATCH',
                                    headers: {
                                        'content-type': 'application/json'
                                    },
                                    body: JSON.stringify(userInfo.myTeams)
                                })
                                    .then(res => res.json())
                                    .then(d => console.log(d))
                            })

                    })

            })
    }

    return (
        <div>
            <h2>Team Request</h2>
            <div className="overflow-x-auto ">
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
                            userInfo?.teamRequest?.map((team, index) => <tr key={team.teamId}>
                                <th>{index + 1}</th>
                                <td>{team?.teamName}</td>
                                <td className='flex '>
                                    <button onClick={() => handleJoin(team.teamId)} className='btn bg-green-500'>Join</button>
                                    <button className=' btn bg-orange-500'>Decline</button>
                                </td>

                            </tr>)
                        }
                    </tbody>

                </table>
            </div>


        </div>
    );
};

export default TeamRequest;