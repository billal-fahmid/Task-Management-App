import React, { useState } from 'react';
import useLoadTasks from '../hooks/useLoadTasks';
import Heading from './Heading';
import Swal from 'sweetalert2'
import Modal from './modal';

const AllTasks = () => {
    const [tasks, isLoading, refetch] = useLoadTasks()
    console.log(tasks)

  

    const handleDelete = (id) => {
        console.log(id)

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://tasks-manage-server-billal-fahmid.vercel.app/tasks/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })

            }
        })

    }
    // const [showModal, setShowModal] = useState(false);

    const [modalData, setModalData] = useState(null)
   
    const handleUpdateTask=(data ,e)=>{
        console.log(data)
        fetch(`https://tasks-manage-server-billal-fahmid.vercel.app/task/update/${data._id}`,{
            method:'PUT',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.matchedCount>0){
                refetch()
                setModalData(null)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your Update has been saved',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }

    return (
        <div>
            <Heading heading={'All Tasks'} subHeading={'Manage Your To-Do List'}></Heading>
            <div className="overflow-x-auto ">
                <table className="table table-xs ">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Bayer Name</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Priority Level</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks?.map((task, index) => <tr key={task._id}>
                                <th>{index + 1}</th>
                                <td>{task?.title}</td>
                                <td>{task?.description}</td>
                                <td>{task?.bayerName}</td>
                                <td>{task?.dueDate}</td>
                             
                                <td className={`${task.status==='Pending'?'bg-yellow-300': task.status==='In Progress'?  'bg-orange-300':'bg-green-400'}`}>{task?.status}
                                </td>
                                <td>{task?.priorityLevel}</td>
                                <td>
                                    
                                    <div className="btn-group btn-group-horizontal">
                                        <button onClick={() => setModalData(task)} className="btn btn-sm bg-orange-400 hover:bg-orange-500 ">Edit</button>
                                        <button onClick={() => handleDelete(task?._id)} className="btn btn-sm bg-red-500 hover:bg-red-400">Delete</button>
                                    </div>
                                </td>

                            </tr>)
                        }
                    </tbody>

                </table>
            </div>

        {modalData && <Modal  modalData={modalData} setModalData={setModalData} handleUpdateTask={handleUpdateTask}></Modal>}




        </div>
    );
};

export default AllTasks;