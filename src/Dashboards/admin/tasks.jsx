import React, { useContext } from 'react'
import { useState } from 'react'
import Modal from '../others/modals'
import { useModal } from "../../context/ModalContext";
import CreateTaskForm from '../others/CreateTaskForm';
import { FetchDataContext } from '../../context/fetchData';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const Tasks = ({ employeeData, tasksData, count, }) => {


    const { openModal, closeModal } = useModal();

    const handleOpen = () => {
        openModal(
            <CreateTaskForm employeeData={employeeData} />
        );
    };

    const { assignCount, unassignedCount, pendingCount, completedCount } = count;

    const { fetchData } = useContext(FetchDataContext);

    const chartData = [
        { name: "Assigned", value: assignCount },
        { name: "Pending", value: pendingCount },
        { name: "Completed", value: completedCount }
    ];

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

            fetchData(); // Refresh data after deletion


        } catch (error) {
            console.error("🔥 Caught exception:", error);
        }
    };
    return (
        <>
            <div className="contanier w-[85%] h-screen space-y-5 bg-gray-200">
                <div className="heading flex justify-between">
                    <h1 className='text-3xl ml-[45px] mt-[25px] font-bold'>Employee Task Manager</h1>
                    <div>
                        <button onClick={handleOpen} className='mr-[45px] mt-[30px] font-bold  cursor-pointer border px-4 py-2 rounded-xl flex justify-center items-center gap-2 bg-blue-600 text-white ' >
                            <img src="/images/create.svg" alt="" />  Create Task
                        </button>
                    </div>
                </div>
                <div className=' w-full flex mt-2  '>
                    <div className="first h-full w-[65%] pl-8 ">
                        <div className="cards h-[98%] w-[99%] flex justify-start flex-wrap gap-5 overflow-y-auto  " style={{ willChange: "transform" }}>
                            {
                                tasksData && tasksData.length === 0 ? (
                                    <div className='w-full h-[100px] flex justify-center items-center '>
                                        <div className='w-[60%] h-[60%] bg-red-400 flex justify-center items-center rounded-2xl text-white'>

                                            <h1 className='text-2xl font-bold'>👨‍✈️ Oh! Look like you didn't given tasks</h1>
                                        </div>
                                    </div>
                                ) : (

                                    tasksData && tasksData.map((task, index) => (
                                        <div key={index} className="card h-[280px] w-[380px] rounded-2xl bg-red-400 shadow">
                                            <div className='h-[50px] w-full flex justify-between items-center px-4'>
                                                <h1 className='text-white text-2xl font-bold'>{task.taskname}</h1>
                                                <div className='w-[70px]  h-full'>
                                                    <div className='w-full h-[15px]  flex justify-start items-center pt-2.5 pl-0.5 '>
                                                        <h1 className='text-[12px] font-medium text-white'>Deadline</h1>
                                                    </div>
                                                    <div className='w-full h-[35px] flex justify-start '>
                                                        <h1 className='text-[20px] font-bold text-white'>{new Date(task.deadline).toLocaleDateString('en-GB', {
                                                            day: '2-digit',
                                                            month: 'short'
                                                        })}</h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='h-[95px] w-full '>
                                                <div className='h-[95px] w-full flex-col px-4 pt-2'>
                                                    <p className=' text-white text-sm '> {task.desc}.</p>
                                                </div>
                                            </div>
                                            <div>
                                                <div className=' mt-2 w-full flex justify-between items-center px-4'>
                                                    <div className='flex justify-start items-center gap-2'>
                                                        <h1 className='text-white text-[10px] font-bold'>Assigned to</h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='w-full h-[65px] flex justify-between items-center  mt-1 '>
                                                <div className='w-[15%] ml-4 h-full flex justify-center items-center'>
                                                    <img className='rounded-[50%] w-[50px]  h-[50px] object-cover overflow-hidden ' src={task.assignedTo.profilePicture} alt="" />

                                                </div>
                                                <div className='w-[80%]  h-full pt-2'>
                                                    <div className='flex justify-between items-center'>  <h1 className='text-white text-[18px] font-bold pl-2 '>
                                                        {task.assignedTo ? task.assignedTo.name : "Not Assigned Yet"}
                                                    </h1>
                                                        <div className='flex justify-center items-center h-[20px] w-[45px] rounded bg-white mr-3'>
                                                            <h3 className='font-medium text-[12px] '>High</h3>
                                                        </div>
                                                    </div>
                                                    <div className='flex justify-between items-center'>
                                                        <h1 className='text-white text-[10px] font-medium pl-2 '>
                                                            {task.assignedTo ? task.assignedTo.email : "Not Assigned Yet"}
                                                        </h1>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='w-full h-[35px] flex justify-around items-center '>


                                                <button className='bg-white  py-1 px-4 rounded font-medium cursor-pointer flex items-center gap-2'> <img src="/images/reminder2.png" className='w-5' alt="" />Remind Employee</button>
                                                <button onClick={() => handleDelete(task._id)} className='bg-white  py-1 px-4 rounded font-medium cursor-pointer flex items-center gap-2'> <img src="/images/delete.svg" className='w-5' alt="" />Delete Task</button>


                                            </div>
                                        </div>
                                    ))
                                )
                            }





                        </div>
                    </div>
                    <div className="second h-full w-[35%] ">
                        <div className="cards h-[98%] w-[99%] gap-2 flex justify-center flex-wrap items-center overflow-y-auto  " style={{ willChange: "transform" }}>
                            <div className="card h-[250px] w-[380px] rounded-2xl bg-white shadow">
                                <div className='h-[50px] w-full flex justify-between items-center px-4'>
                                    <h1 className='font-bold'>Employee Task Performance</h1>
                                    <div className='flex items-end gap-1'>
                                        
                                    </div>

                                </div>
                                <div className="h-[220px] w-full  justify-center items-center">
                                    <ResponsiveContainer width="90%" height="95%">
                                        <BarChart
                                            data={chartData}
                                            barSize={30}
                                            margin={{ top: 20, right: 40, left: 40, bottom: 20 }}
                                        >
                                            <XAxis
                                                dataKey="name"
                                                tick={{ fontSize: 12, fill: "#555" }}
                                                axisLine={false}
                                                tickLine={false}
                                            />
                                            <YAxis
                                                tick={{ fontSize: 12, fill: "#555" }}
                                                axisLine={false}
                                                tickLine={false}
                                                gridLine={{ stroke: "#e0e0e0" }}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    borderRadius: "8px",
                                                    border: "none",
                                                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                                                }}
                                            />
                                            <Legend
                                                wrapperStyle={{ fontSize: "12px" }}
                                                iconType="circle"
                                                verticalAlign="bottom"
                                            />
                                            <Bar
                                                dataKey="value"
                                                radius={[6, 6, 0, 0]}
                                                fill="url(#colorValue)"
                                            />
                                            <defs>
                                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#4CAF50" stopOpacity={0.9} />
                                                    <stop offset="100%" stopColor="#4CAF50" stopOpacity={0.6} />
                                                </linearGradient>
                                            </defs>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>


                            </div>
                            <div className="card h-[120px] w-[380px] rounded-2xl bg-white shadow flex">
                                <div className='w-1/2 h-full '>
                                    <div className="upper h-[70%] w-full flex justify-center items-center text-[80px] font-bold text-yellow-400">
                                        {unassignedCount}
                                    </div>
                                    <div className=' h-[30%] w-full flex justify-center items-center text-[15px] font-medium'>
                                        Not Assinged Tasks
                                    </div>
                                </div>
                                <div className='w-1/2 h-full '>
                                    <div className="upper h-[70%] w-full flex justify-center items-center text-[80px] text-blue-400 font-bold">
                                        {assignCount}
                                    </div>
                                    <div className=' h-[30%] w-full flex justify-center items-center text-[15px] font-medium'>
                                        Assinged Tasks
                                    </div></div>
                            </div>
                            <div className="card h-[120px] w-[380px] rounded-2xl bg-white flex">
                                <div className='w-1/2 h-full '>
                                    <div className="upper h-[70%] w-full flex justify-center items-center text-[80px] font-bold text-red-400">
                                        {pendingCount}
                                    </div>
                                    <div className=' h-[30%] w-full flex justify-center items-center text-[15px] font-medium'>
                                        Pending Tasks
                                    </div>
                                </div>
                                <div className='w-1/2 h-full '>
                                    <div className="upper h-[70%] w-full flex justify-center items-center text-[80px] text-green-400 font-bold">
                                        {completedCount}
                                    </div>
                                    <div className=' h-[30%] w-full flex justify-center items-center text-[15px] font-medium'>
                                        Completed Tasks
                                    </div></div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Tasks
