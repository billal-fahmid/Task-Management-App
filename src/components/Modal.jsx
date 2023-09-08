import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from "react-datepicker";

const Modal = ({ modalData, setModalData, handleUpdateTask }) => {
    const dateline = () => {
        const [startDate, setStartDate] = useState(new Date());
        return (
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        );
    };
    // console.log(modalData)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data, e) => {
        // console.log(data)
        handleUpdateTask(data, e)

    };

    return (
        <>


            <>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div
                        className="fixed inset-0 w-full h-full bg-black opacity-40"
                        onClick={() => setModalData(null)}
                    ></div>
                    <div className="flex items-center min-h-screen px-4 py-8">
                        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                            <div className="mt-3 ">

                                <div className="mt-2 text-center sm:ml-4 sm:text-left">
                                    <h4 className="text-lg font-medium text-gray-800">
                                        Update Task Info ?
                                    </h4>
                                    <form onSubmit={handleSubmit(onSubmit)}>


                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Title</span>
                                            </label>
                                            <input type="text" defaultValue={modalData.title} {...register("title", { required: true })} placeholder="Title" className="input input-bordered" />
                                            {errors.title && <span>Title is required</span>}
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Description</span>
                                            </label>

                                            <textarea name="" placeholder='Description' defaultValue={modalData?.description} {...register("description", { required: true })} className='input h-16 input-bordered' id="" cols="30" rows="10"></textarea>
                                            {errors.description && <span>Description is required</span>}

                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Bayer Name</span>
                                            </label>
                                            <input type="text" defaultValue={modalData?.bayerName} {...register("bayerName", { required: true })} placeholder="bayer Name" className="input input-bordered" />
                                            {errors.bayerName && <span>Bayer Name is required</span>}
                                        </div>

                                        <div className='flex  gap-5'>
                                            <div className="form-control w-full lg:w-1/2">
                                                <label className="label">
                                                    <span className="label-text">Due Date</span>
                                                </label>
                                                <input type="date" onClick={dateline()} defaultValue={modalData?.dueDate}  {...register("dueDate", { required: true })} placeholder="Due Date" className="input input-bordered" />
                                                {errors.dueDate && <span>Due Date is required</span>}
                                            </div>
                                            <div className='form-control w-full lg:w-1/2'>
                                                <label className="label">
                                                    <span className="label-text">Status</span>
                                                </label>
                                                <select name="" defaultValue={modalData?.status} {...register("status", { required: true })} className='input input-bordered' id="">
                                                    <option value="Pending">Pending</option>
                                                    <option value="In Progress">In Progress</option>
                                                    <option value="Completed">Completed</option>
                                                </select>
                                                {errors.status && <span>Status is required</span>}
                                            </div>

                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Priority Level</span>
                                            </label>
                                            <select name="" defaultValue={modalData?.priorityLevel} {...register("priorityLevel", { required: true })} className='input input-bordered' id="">
                                                <option value="High Priority">High Priority</option>
                                                <option value="Medium Priority">Medium Priority</option>
                                                <option value="Basic Priority">Basic Priority</option>
                                            </select>
                                            {errors.priorityLevel && <span>Priority is required</span>}
                                        </div>
                                        <div className="form-control">

                                            <input className="input input-bordered hidden" defaultValue={modalData?._id} type='text'  {...register("_id")} />

                                        </div>

                                        <div className="items-center gap-2 mt-3 sm:flex">
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-white bg-green-600 rounded-md outline-none ring-offset-2 ring-green-600 focus:ring-2" type='submit'
                                            >
                                                Update
                                            </button>
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                                onClick={() =>
                                                    setModalData(null)
                                                }
                                            >
                                                Cancel
                                            </button>
                                        </div>


                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        </>
    );
};

export default Modal;