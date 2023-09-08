import Heading from './Heading';
import { useForm } from "react-hook-form";
import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthContext } from './Provider/AuthProvider';
import useTeams from '../hooks/useTeams';




const AddFrom = () => {

    const {user} = useContext(AuthContext)

    const [teams, isLoading, refetch] = useTeams();
    // console.log(teams)
    const checkClick=()=>{
        // console.log('its work')
    }
   
   

    const dateline = () => {
        const [startDate, setStartDate] = useState(new Date());
        return (
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        );
    };
    const { register, handleSubmit,  formState: { errors } } = useForm();
    const onSubmit = (data, e) => {
        console.log(data,'clicked')
        fetch(`https://tasks-manage-server-billal-fahmid.vercel.app/tasks`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    toast("Your Task Added Successful")
                    e.target.reset()
                }
            })
    };

    return (
        <div>

            <div className=" min-h-screen bg-base-200">
                <ToastContainer />
                <Heading heading={'Add Tasks'} subHeading={'Manage Your To-Do List'}></Heading>
                <div className=" p-0 md:p-4 flex justify-center gap-1 w-full mt-0 ">

                    <div className="card  w-full  shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full card-body">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input type="text" {...register("title", { required: true })} placeholder="Title" className="input input-bordered" />
                                {errors.title && <span>Title is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                {/* <in type="text" placeholder="password" className="input input-bordered" /> */}
                                <textarea name="" placeholder='Description' {...register("description", { required: true })} className='input h-16 input-bordered' id="" cols="30" rows="10"></textarea>
                                {errors.description && <span>Description is required</span>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Bayer Name</span>
                                </label>
                                <input type="text" {...register("bayerName", { required: true })} placeholder="bayer Name" className="input input-bordered" />
                                {errors.bayerName && <span>Bayer Name is required</span>}
                            </div>
                            <div className="form-control hidden">
                             
                                <input type="text" {...register("postByUser", { required: true })} value={user?.email} placeholder="bayer Name" className="input input-bordered" />
                                {/* {errors.bayerName && <span>Bayer Name is required</span>} */}
                            </div>
                            <div className='flex  gap-5'>
                                <div className="form-control w-full lg:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Due Date</span>
                                    </label>
                                    <input type="date" onClick={dateline()}  {...register("dueDate", { required: true })} placeholder="Due Date" className="input input-bordered" />
                                    {errors.dueDate && <span>Due Date is required</span>}
                                </div>
                                <div className='form-control w-full lg:w-1/2 hidden'>
                                    <label className="label">
                                        <span className="label-text">Status</span>
                                    </label>
                                    {/* <select name="" {...register("status", { required: true })} className='input input-bordered' id="">
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select> */}
                                    <input type="text" {...register("status", { required: true })} placeholder="Status" value={'Pending'} className="input input-bordered" />
                                    {errors.status && <span>Status is required</span>}
                                </div>
                                <div className="form-control w-full lg:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Priority Level</span>
                                    </label>
                                    <select name="" {...register("priorityLevel", { required: true })} className='input input-bordered' id="">
                                        <option value="High Priority">High Priority</option>
                                        <option value="Medium Priority">Medium Priority</option>
                                        <option value="Basic Priority">Basic Priority</option>
                                    </select>
                                    {errors.priorityLevel && <span>Priority is required</span>}
                                </div>

                            </div>

                            <div className="form-control">
                            <label className="label">
                                        <span className="label-text">Assign Team</span>
                                    </label>
                                    <select name="" {...register("assignTeam", { required: true })} className='input input-bordered' id="">
                                        {
                                            teams?.map((team,index)=>
                                            <option key={index} value={team?.teamName}>{team?.teamName}</option>)
                                        }
                                        
                                    </select>
                                    {errors.assignTeam && <span>Team is required</span>}
                                {/* <Controller
                                    name="selectedUsers"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            isMulti
                                            options={options}
                                            {...field}
                                        />
                                    )}
                                /> */}
                            </div>

                            <div className="form-control mt-6">
                                <button onClick={()=>checkClick()} className="btn btn-primary" type="submit">Add Tasks</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddFrom;