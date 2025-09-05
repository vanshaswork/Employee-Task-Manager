import React from 'react'
import { useModal } from "../../context/ModalContext";
import { useState } from 'react';
import { useContext } from 'react';

const Employeeinfo = ({ employee }) => {

    const { closeModal } = useModal();

    const [employeeWorkMap, setEmployeeWorkMap] = useState("completedTask")



    return (
        <div className="h-[85vh] w-[90vh] bg-gray-50 p-3 relative">
            {/* Employee Header */}
            <div className="bg-white shadow rounded-2xl p-3 flex items-center gap-6 mb-3">
                <img
                    src={employee.profilePicture || "https://www.w3schools.com/howto/img_avatar.png"}
                    alt="Employee"
                    className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                    <h1 className="text-xl font-semibold">{employee.name}</h1>
                    <p className="text-gray-500">{employee.department}{employee.empId}</p>
                    <div className="flex gap-6 text-[10px] text-gray-600 mt-2">
                        <p>📧 {employee.email}</p>
                        <p>📞 +91 {employee.phone}</p>
                    </div>
                </div>
                <img onClick={closeModal} className='absolute top-[-10px] right-[-60px] cursor-pointer w-9 ' src="/images/cross.svg" alt="" />
            </div>
            {/* Tasks Overview */}
            <div className='  h-[83%] flex space-x-2'>
                <div className='h-full w-[72%] '>
                    <h2 className="text-lg font-semibold mb-3 ">Tasks Overview</h2>
                    <div className="bg-white shadow h-[100px] rounded-lg p-4 gap-4 ">
                        <div className="space-x-4 flex ">
                            <div onClick={() => setEmployeeWorkMap("completedTask")} className="bg-green-100 rounded-xl transition-all cursor-pointer hover:scale-110  w-[95px]  p-2 text-center">

                                <p className="text-2xl font-bold text-green-600">{employee?.completedTask?.length}</p>
                                <p className="text-green-600 text-sm">Completed</p>
                            </div>
                            <div onClick={() => setEmployeeWorkMap("pendingTask")} className="bg-yellow-100 rounded-xl transition-all cursor-pointer hover:scale-110  w-[95px]  p-2 text-center">
                                <p className="text-2xl font-bold text-yellow-600">{employee?.pendingTask?.length}</p>
                                <p className="text-yellow-600 text-sm">Pending</p>
                            </div>
                            <div onClick={() => setEmployeeWorkMap("submiteddReports")} className="bg-blue-100 rounded-xl transition-all cursor-pointer hover:scale-110  w-[95px]  p-2 text-center">
                                <p className="text-2xl font-bold text-blue-600">{employee?.submitedReports?.length}</p>
                                <p className="text-blue-600 text-sm">Submitted</p>
                            </div>
                            <div onClick={() => setEmployeeWorkMap("deadlinePassed")} className="bg-red-100 rounded-xl transition-all cursor-pointer hover:scale-110  w-[95px]  p-2 text-center">
                                <p className="text-2xl font-bold text-red-600">{employee?.deadlinePassed?.length}</p>
                                <p className="text-red-600 text-sm">Failed</p>
                            </div>
                        </div>

                    </div>
                    <div className='w-full h-[48.5vh] mt-2'>

                        <div className="col-span-2 bg-white shadow rounded-2xl p-6 ">
                            <h2 className="text-lg font-semibold mb-4">Task List</h2>
                            <div style={{ willChange: "transform" }} className="space-y-4 overflow-y-auto h-[35vh] ">
                                {employee[employeeWorkMap]?.length > 0 ? (
                                    employee[employeeWorkMap].map((task, index) => (
                                        <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                                            <div>
                                                <p className=" font-medium">{task.taskname}</p>
                                                <p className="text-gray-500 text-sm">{task.desc}</p>
                                            </div>
                                            {employeeWorkMap === "completedTask" ?
                                                <span className="px-3 py-1 rounded-lg text-sm font-medium bg-green-100 text-green-600">
                                                    Completed
                                                </span>
                                                : employeeWorkMap === "pendingTask" ?
                                                    <span className="px-3 py-1 rounded-lg text-sm font-medium bg-yellow-100 text-yellow-600">
                                                        Pending
                                                    </span>
                                                    : employeeWorkMap === "submitedReports" ?
                                                        <span className="px-3 py-1 rounded-lg text-sm font-medium bg-blue-100 text-blue-600">
                                                            Submitted
                                                        </span>
                                                        : employeeWorkMap === "deadlinePassed" ?
                                                            <span className="px-3 py-1 rounded-lg text-sm font-medium bg-red-100 text-red-600">
                                                                Failed
                                                            </span>
                                                            : null
                                            }
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-gray-500 py-10">
                                        <p className="text-lg font-semibold">No tasks found</p>
                                    </div>
                                )}

                            </div>
                        </div>

                    </div>
                </div>
                <div className='h-full'>
                    <h2 className=" text-lg font-semibold mb-4">Submitted Reports</h2>
                    <div className="col-span-1 h-[62vh] bg-white shadow rounded-2xl p-3 w-[190px] overflow-y-auto">
                        <div className="space-y-4">
                            <div className="flex flex-col gap-2 items-center border justify-between p-2 rounded-xl">
                                <div>
                                    <p className="font-medium ">Weekly Report - Week 32</p>
                                    <p className="text-gray-500 text-sm">Aug 2, 2025</p>
                                </div>
                                <a href="#" className="text-blue-600 font-medium hover:underline">
                                    View
                                </a>
                            </div>
                            <div className="flex flex-col gap-2 items-center border justify-between p-2 rounded-xl">
                                <div>
                                    <p className="font-medium ">Weekly Report - Week 32</p>
                                    <p className="text-gray-500 text-sm">Aug 2, 2025</p>
                                </div>
                                <a href="#" className="text-blue-600 font-medium hover:underline">
                                    View
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
                <div></div>
            </div>
        </div>


    );
};


export default Employeeinfo
