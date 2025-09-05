import React, { useState, useContext } from 'react'
import { FetchDataContext } from '../context/fetchData';
import { useModal } from '../context/ModalContext';


const EmployeeCompletedTasks = ({ data }) => {
    const { closeModal } = useModal();
    const { fetchData } = useContext(FetchDataContext);
    const [completaionTime, setCompletaionTime] = useState(null)




    const [searchQuery, setSearchQuery] = useState("");


    const filteredTasks = data.completedTask?.filter((task) => {
        const query = searchQuery.toLowerCase();
        return (
            task.taskname?.toLowerCase().includes(query) ||
            task.desc?.toLowerCase().includes(query)
        );
    }) || [];





    return (
        <div className="h-[80vh] flex flex-col items-center p-6 relative">
            <img
                onClick={closeModal}
                className="absolute top-0 right-2 w-7 cursor-pointer"
                src="/images/cross.svg"
                alt=""
            />
            <h1 className="text-2xl font-bold mb-6">{data.name}'s Completed Tasks</h1>

            <div className='w-full max-w-4xl min-w-[30vw] h-7 flex justify-center mb-4'>
                <div className='relative rounded-xl w-[230px] h-[30px] bg-gray-200'>
                    <img className='absolute bottom-[5px] left-2 w-5' src="/images/search.svg" alt="" />
                    <input
                        className='pl-9 pr-1 pb-0.5 rounded-xl w-full h-full outline-none'
                        placeholder='Search Completed Tasks'
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>


            <div className="w-full max-w-4xl min-w-[30vw] grid gap-6">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-xl p-5 flex justify-between items-center hover:shadow-lg transition gap-8"
                        >
                            <div>
                                <h2 className="text-lg font-semibold">{task.taskname}</h2>
                                <p className="text-sm text-gray-600">{task.desc}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    Assigned: {data.currentTask?.assignedDate
                                        ? new Date(data.currentTask.assignedDate).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                        })
                                        : ""}
                                </p>
                            </div>
                            <div className="text-sm text-gray-500">
                                <p>
                                    Due: {task.deadline
                                        ? new Date(task.deadline).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                        })
                                        : ""}
                                </p>
                                {/* <p className='font-bold'>✅ Completed Before Due</p> */}
                                <p className="font-bold">
                                    {task.completedDate && task.deadline
                                        ? new Date(task.completedDate) > new Date(task.deadline)
                                            ? "⭐ Completed After Due"
                                            : "✅ Completed Before Due"
                                        : "✅ Completed"}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500">
                        No completed tasks found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeCompletedTasks;
