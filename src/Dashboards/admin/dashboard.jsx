import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { useModal } from "../../context/ModalContext";
import EditTaskForm from '../others/EditTaskForm';
import { FetchDataContext } from "../../context/fetchData.jsx";



const dashboard = ({count}) => {

    const { data, fetchData } = useContext(FetchDataContext);
    const [taskData, setTaskData] = useState([])
    const { openModal, closeModal } = useModal();
    const [employeeDataLength, setEmployeeDataLength] = useState([])
    const {completedCount} = count || 0;


    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:3000');
                const result = await response.json();
                setTaskData(result.tasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }
        fetchTasks();
    }, []);

    useEffect(() => {
        if (data) {
            setEmployeeDataLength(data?.employees?.length || 0);
           
        }
    }, [data?.tasks, data?.employees]);

    const completionrate  = taskData.length > 0 ?((completedCount / taskData.length) * 100).toFixed(1) : 0;

    const now = new Date();
    const overdueTasks = taskData.filter(task => new Date(task.deadline) < now && task.status !== "completed").length;

   const handleDelete = async (id) => {
    try {
           const response = await fetch(`http://localhost:3000/${id}`, {
            method: 'DELETE',
        });


        if (!response.ok) {
            const res = await response.json();
            console.error("❌ Failed to delete:", res?.message || 'Unknown error');
            return;
        }

        setTaskData(prevTasks => prevTasks.filter(task => task._id !== id));

        fetchData();
        

    } catch (error) {
        console.error("🔥 Caught exception:", error);
    }
};




    const handleEdit = (id) => {
        openModal(
            <>
                <EditTaskForm />
            </>
        )
    }


    return (
        <>
            <div className="contanier w-[85%] h-screen space-y-5 bg-gray-200">
                <div className="heading">
                    <h1 className='text-3xl ml-[45px] mt-[25px] font-bold'>Dashboard Overview</h1>
                </div>
                <div className="boxs flex justify-center items-center mt-5">
                    <div className="box1 flex gap-3 w-[280px] h-[110px] bg-white m-3 p-5 rounded-xl">
                        <div>
                            <img className='w-[70px]' src="/images/people.png" alt="" />
                        </div>
                        <div>
                            <h1 className='text-xl font-bold'>Total Employees</h1>
                            <p className='text-3xl font-extrabold mt-0.5'>{employeeDataLength}</p>
                        </div>
                    </div>
                    <div className="box1 flex gap-3 w-[280px] h-[110px] bg-white m-3 p-5 rounded-xl ">
                        <div>
                            <img className='w-[70px]' src="/images/tasks.png" alt="" />
                        </div>
                        <div>
                            <h1 className='text-xl font-bold'>Total Tasks</h1>
                            <p className='text-3xl font-extrabold mt-0.5'>{taskData.length}</p>
                        </div>
                    </div>
                    <div className="box1 flex gap-3 w-[280px] h-[110px] bg-white m-3 p-5 rounded-xl">
                        <div>
                            <img className='w-[70px]' src="/images/done.png" alt="" />
                        </div>
                        <div>
                            <h1 className='text-xl font-bold'>Completion Rate</h1>
                            <p className='text-3xl font-extrabold mt-0.5'>{completionrate}%</p>
                        </div>
                    </div>
                    <div className="box1 flex gap-3 w-[280px] h-[110px] bg-white m-3 p-5 rounded-xl ">
                        <div>
                            <img className='w-[70px]' src="/images/pending.png" alt="" />
                        </div>
                        <div>
                            <h1 className='text-xl font-bold'>Overdue Tasks </h1>
                            <p className='text-3xl font-extrabold mt-0.5'>{overdueTasks}</p>
                        </div>
                    </div>
                </div>
                <div className="second h-[49.5%] w-full flex justify-center items-center">
                    <div className="employeelist w-[92%] h-[100%] rounded-2xl bg-white  ">
                        <div className="heading flex items-center justify-between px-5 w-full h-[15%] border-b-2 border-gray-200 ">
                            <h1>Status - All</h1>
                            <div className=' relative rounded-xl w-[250px] h-[40px] bg-gray-200'>
                                <img className='absolute bottom-[8px] left-2' src="/images/search.svg" alt="" />
                                <input className=' pl-9 pr-1 pb-0.5 rounded-xl  w-full h-full' placeholder='Search Employee/Task' type="text" />
                            </div>
                        </div>
                        <div className='h-[85%] w-full overflow-y-scroll overflow-x-hidden '>
                            <table className=" w-full">
                                <thead>
                                    <tr className='border-b-2 text-[15px]  border-gray-200'>
                                        <th className=' w-[5%] py-3 font-medium text-gray-400 '></th>
                                        <th className=' w-[15%] py-3 font-medium text-gray-400 '>Name</th>
                                        <th className='  w-[20%] py-3 font-medium text-gray-400  '>Task Name</th>
                                        <th className=' w-[20%] py-3 font-medium text-gray-400  '>Deadline</th>
                                        <th className=' w-[20%] py-3 font-medium text-gray-400  '>Status</th>
                                        <th className=' w-[20%] py-3 font-medium text-gray-400  '>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {taskData?.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="text-center font-bold text-2xl py-5"> ⛔ No Tasks To Show</td>
                                        </tr>
                                    ) :
                                        taskData.map((task, index) => (
                                            <tr key={index} className='text-center text-md border-b-2 border-gray-200'>
                                                <td className='py-5 font-bold justify-items-center'>
                                                    {task.priorty === 'High' ?
                                                        <div className='h-6 w-6 bg-red-500 text-white flex justify-center items-center rounded'>
                                                            H
                                                        </div> :
                                                        <div className='h-6 w-6 bg-yellow-500 text-white flex justify-center items-center rounded'>
                                                            L
                                                        </div>
                                                    }
                                                </td>
                                                <td className='py-5 font-bold'>{task.assignedTo ? task.assignedTo.name : '⚠️ Unassigned'}</td>
                                                <td className='py-5 font-bold'>{task.taskname}</td>
                                                <td className='py-5 font-bold'>  {new Date(task.deadline).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: 'long'
                                                })}</td>
                                                <td className='py-5 font-bold'>{task.status}</td>
                                                <td className=' py-5 flex justify-center items-center font-bold space-x-2'>
                                                    <span onClick={() => handleDelete(task._id)} className='cursor-pointer'>
                                                        <img src="/images/delete.svg" alt="" />
                                                    </span>
                                                    <span onClick={() => handleEdit(task._id)} className='cursor-pointer'>
                                                        <img src="/images/edit.svg" alt="" />
                                                    </span>
                                                    <span className='cursor-pointer'>
                                                        <img src="/images/info.svg" alt="" />
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}


export default dashboard
