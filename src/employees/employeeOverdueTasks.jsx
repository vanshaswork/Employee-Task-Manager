import React from 'react'
import { FetchDataContext } from '../context/fetchData';
import { useModal } from '../context/ModalContext';
import { useContext } from 'react';

const EmployeeOverdueTasks = ({data}) => {
    
        const { closeModal } = useModal();
        const { fetchData } = useContext(FetchDataContext);
    return (
        <div>
            <div className="h-[80vh] flex flex-col items-center p-6 relative">
                <img onClick={closeModal} className="absolute top-0 right-2 w-7 cursor-pointer " src="/images/cross.svg" alt="" />
                <h1 className="text-2xl font-bold mb-6">{data.name}'s Overdue Tasks</h1>

                <div className="w-full max-w-4xl min-w-[30vw] grid gap-6">
                    {/* Task Card 1 */}
                    {data.deadlinePassed && data.deadlinePassed.length > 0 ? data.deadlinePassed.map((task, index) => (
                        <div key={index} className="bg-white shadow-md rounded-xl p-5 flex justify-between items-center hover:shadow-lg transition gap-8">
                            <div>
                                <h2 className="text-lg font-semibold">{task.taskname}</h2>
                                <p className="text-sm text-gray-600">{task.desc}</p>
                                <p className="text-xs text-gray-400 mt-1">Assigned: {data.currentTask?.assignedDate
                                    ? new Date(data.currentTask.assignedDate).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                    })
                                    : ""}</p>
                            </div>
                            <div className="text-sm text-gray-500">
                                <p>Due: {task.deadline ? new Date(task.deadline).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                }) : ""}</p>
                                <p>Status: {task.status}</p>
                            </div>

                        </div>
                    )) : (
                        <div className="text-center text-gray-500">
                            No Overdue tasks available.
                        </div>
                    )}



                </div>
            </div>
        </div>
    )
}

export default EmployeeOverdueTasks
