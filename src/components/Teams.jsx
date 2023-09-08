import React, { useContext, useState } from 'react';
import Heading from './Heading';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import useUsers from '../hooks/useUsers';
import { AuthContext } from './Provider/AuthProvider';
import { toast } from 'react-toastify';
import useTeams from '../hooks/useTeams';
import TeamMemberModal from './TeamMemberModal';
import useUser from '../hooks/useUser';

const Teams = () => {

    const { user } = useContext(AuthContext)

    const [userInfo , ,] = useUser(user.email)
    console.log(userInfo)
   
    const [users, isLoading, refetch] = useUsers();
    console.log(users)
    const withoutCreator=users.filter(singleUser=>singleUser.email !== user.email)
    const options = withoutCreator?.map(user => ({
        id: user._id,
        label: user.userName,
        value: user.userName,
        status: 'invite'
    }));

    const [modalData1, setModalData1] = useState(null)

    const [teams, ,] = useTeams();
    console.log('from useTeams', teams)


    const { register, handleSubmit, watch, control, formState: { errors } } = useForm();
    const onSubmit = (data, e) => {
        // console.log(data)
        data.selectedUsers.push({
            id: userInfo._id,
            label: userInfo.userName,
            value: userInfo.userName,
            status: 'accepted'
        })
        const team = {
            teamName: data.teamName,
            createBy: user?.email,
            teamMember: data.selectedUsers
        }
        console.log()
        fetch(`https://tasks-manage-server-billal-fahmid.vercel.app/create/team`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(team)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                const teamId = result.insertedId;
                userInfo.myTeams.push(teamId)
                if (result.insertedId) {
                    console.log(result.insertedId)
                    fetch(`http://localhost:5000/update/myTeams/${userInfo._id}`,{
                        method: 'PATCH',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(userInfo.myTeams)
                    })
                    .then(res=>res.json())
                    .then(d => console.log(d))

                    // console.log(data.selectedUsers)
                    data.selectedUsers?.map(worker => {
                        console.log(worker.id)
                        fetch(`http://localhost:5000/user/${worker.id}`)
                            .then(res => res.json())
                            .then(result1 => {
                                console.log(result1)
                                const teamRequest = result1.teamRequest
                                const teamInfo = {
                                    teamId,
                                    teamName: data.teamName
                                }
                                teamRequest.push(teamInfo)
                                console.log(teamRequest)
                                fetch(`http://localhost:5000/user/update/${worker.id}`, {
                                    method: 'PATCH',
                                    headers: {
                                        'content-type': 'application/json'
                                    },
                                    body: JSON.stringify({ teamRequest })
                                })
                                    .then(res => res.json())
                                    .then(data => console.log('after sent request', data))
                            })
                    }

                    )
                    toast("Your Task Added Successful")
                    e.target.reset()
                }
            })
    };




    return (
        <div>

            <div>
                <div className=" h-full bg-base-200">
                    <Heading heading={'Teams & Create Team'} subHeading={'Manage Your To-Do List'}></Heading>

                    <div className=" p-0 md:p-4 flex justify-center gap-1 w-full mt-0 ">

                        <div className="card  w-full  shadow-2xl bg-base-100">
                            <form onSubmit={handleSubmit(onSubmit)} className="w-full card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Team Name</span>
                                    </label>
                                    <input type="text" {...register("teamName", { required: true })} placeholder="Team Name" className="input input-bordered" />
                                    {errors.teamName && <span>Team Name is required</span>}
                                </div>


                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Assign other Team Member</span>
                                    </label>
                                    <Controller
                                        name="selectedUsers"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                isMulti
                                                options={options}
                                                {...field}
                                            />
                                        )}
                                    />
                                </div>

                                <div className="form-control mt-6">
                                    <button className="btn btn-primary" type="submit">Invite & Create Team</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="overflow-x-auto mt-10">
                        <table className="table table-xs ">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Team Name</th>
                                    <th>Create By</th>
                                    <th>Number of Members</th>
                                    <th>Members</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    teams?.map((team, index) => <tr key={team._id}>
                                        <th>{index + 1}</th>
                                        <td>{team?.teamName}</td>
                                        <td>{team?.createBy}</td>
                                        <td>{team?.teamMember.length}</td>
                                        <td>


                                            <button onClick={() => setModalData1(team?.teamMember)} className="btn btn-sm bg-orange-400 hover:bg-orange-500 ">See</button>


                                        </td>

                                    </tr>)
                                }
                            </tbody>

                        </table>
                    </div>

                </div>
            </div>
            {
                modalData1 && <TeamMemberModal modalData1={modalData1} setModalData1={setModalData1}></TeamMemberModal>
            }
        </div>
    );
};

export default Teams;