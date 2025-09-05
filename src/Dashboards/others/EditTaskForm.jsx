import React from 'react'
import { useEffect, useState } from 'react'
import { useModal } from "../../context/ModalContext";

const EditTaskForm = () => {
    const { openModal, closeModal } = useModal();
    const [editForm, setEditForm] = useState(
        {
            taskname: "",
            desc: "",
            employeeName: "",
            deadline: "",
            priorty: "Low"
        }
    )

    const handleChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    
    return (
        <>
        <div className="cross flex justify-between items-center ">
        <h1 className="text-xl ml-3 font-bold">Edit Task</h1>
        <img onClick={closeModal} className="w-8 cursor-pointer" src="/images/cross.svg" alt="" />
      </div>
      <div className="formAddandUpdate w-full justify-items-center mt-5">
        <form className="w-[80%]" >
          <input name="taskname" value={EditTaskForm.taskname} onChange={handleChange} placeholder="Task Name" className="border px-3 py-1 rounded-xl mb-2 w-full" />
          <textarea name="desc" value={EditTaskForm.desc} onChange={handleChange} placeholder="Description" className="border px-3 py-1 rounded-xl mb-2 w-full h-24" />
          <input name="employeeName" value={EditTaskForm.employeeName} onChange={handleChange} placeholder="Employee Name" className="border px-3 py-1 rounded-xl mb-2 w-full" />
          <input name="deadline" value={EditTaskForm.deadline} onChange={handleChange} type="date" className="border px-3 py-1 rounded-xl mb-2 w-full" />
          <label className="flex items-center space-x-2 mt-2">
            <input type="checkbox"  />
            <span> Priority</span>
          </label>
          <button type="submit" className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-xl">Save Task</button>
        </form>
      </div>
        </>
    )
}

export default EditTaskForm
