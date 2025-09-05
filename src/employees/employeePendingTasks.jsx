import React, { use, useContext } from "react";
import { useState } from "react";
import { useModal } from "../context/ModalContext";
import { FetchDataContext } from "../context/fetchData";

const EmployeePendingTasks = ({ data }) => {


    const { closeModal } = useModal();
    const { fetchData } = useContext(FetchDataContext);

    const handleMarkStarted = async (taskId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:3000/updateTaskStatus/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus, completedDate: newStatus === "✅Completed" ? new Date() : null }),
            });
            const data = await response.json();
            console.log("Task status updated:", data);

            await fetchData(); // Re-fetch data to update the UI
        } catch (error) {
            console.error("Error updating task status:", error);
        }

    }


    console.log(data.currentTask)



    return (
        <div className="h-[80vh] flex flex-col items-center p-6 relative">
            <img onClick={closeModal} className="absolute top-0 right-2 w-7 cursor-pointer " src="/images/cross.svg" alt="" />
            <h1 className="text-2xl font-bold mb-6">{data.name}'s Pending Tasks</h1>

            <div className="w-full max-w-4xl min-w-[30vw] grid gap-6">
                {data.currentTask && data.currentTask.length > 0 ? "Task Available" : "No Task Available"}
                {/* Task Card 1 */}
                {data.pendingTask && data.pendingTask.length > 0 ? data.pendingTask.map((task, index) => (
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
                        <div className="flex flex-col gap-2">

                            {task.status === "🔵Not Started Yet" && (
                                <button
                                    onClick={() => handleMarkStarted(task._id, "🟢In Progress")}
                                    className="cursor-pointer w-[160px] bg-blue-200 text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-400 hover:text-white transition text-sm"
                                >
                                    Mark as Started
                                </button>
                            )}

                            {task.status === "🟢In Progress" && (
                                <button
                                    onClick={() => handleMarkStarted(task._id, "✅Completed",)}
                                    className="cursor-pointer w-[160px] bg-green-200 text-green-600 font-medium px-4 py-2 rounded-lg hover:bg-green-400 hover:text-white transition text-sm"
                                >
                                    Mark as Completed
                                </button>
                            )}

                            {task.status === "✅Completed" && (
                                setTimeout(() => {
                                    <p className="text-green-600 font-semibold">Completed 🥳</p>
                                }, 2000)
                            )}


                        </div>
                    </div>
                )) : (
                    <div className="text-center text-gray-500">
                        No pending tasks available.
                    </div>
                )}



            </div>
        </div>
    );
};

export default EmployeePendingTasks;
