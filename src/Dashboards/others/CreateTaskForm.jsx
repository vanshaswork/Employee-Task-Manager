import React, { useContext, useState } from 'react';
import { useModal } from '../../context/ModalContext';
import { FetchDataContext } from '../../context/fetchData';

const CreateTaskForm = ({ employeeData }) => {

  const { fetchData } = useContext(FetchDataContext);



  const { closeModal } = useModal();
  const [isChecked, setIsChecked] = useState(false);
  const [form, setForm] = useState({
    taskname: "",
    desc: "",
    assignedTo: "",
    deadline: "",
    priorty: "Low"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const toggleChecked = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    setForm({ ...form, priorty: checked ? "High" : "Low" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted:", form);
    try {
      const response = await fetch("http://localhost:3000", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      console.log("Server Response:", data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }

    closeModal();

     fetchData(); // Re-fetch data after submission
  };





  return (
    <>
      <div className="cross flex justify-between items-center ">
        <h1 className="text-xl ml-3 font-bold">Create a Task</h1>
        <img onClick={closeModal} className="w-8 cursor-pointer" src="/images/cross.svg" alt="" />
      </div>
      <div className="formAddandUpdate w-full justify-items-center  mt-5">
        <form className="w-[80%] justify-items-center space-y-3" onSubmit={handleSubmit}>
          <input name="taskname" value={form.taskname} onChange={handleChange} placeholder="Task Name" className="border px-3 py-1 rounded-xl mb-2 w-full" />
          <textarea name="desc" value={form.desc} onChange={handleChange} placeholder="Description" className="border px-3 py-1 rounded-xl mb-2 w-full h-24" />

          <select name="assignedTo"
            value={form.assignedTo}
            onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected >Select Employee</option>
            {employeeData && employeeData.map((employee) => (
              <option key={employee._id} value={employee._id}>{employee.name}</option>
            ))
            }
          </select>
          <input name="deadline" value={form.deadline} onChange={handleChange} type="date" className="border px-3 py-1 rounded-xl mb-2 w-full" />
          <label class="inline-flex justify-center items-center cursor-pointer w-full px-3 py-1 rounded-xl mb-2 mt-2">
            <input onChange={toggleChecked} type="checkbox" checked={isChecked} class="sr-only peer " />
            <span class="ms-3 text-sm font-medium text-black mr-2">Low Priorty</span>
            <div class="relative w-11 h-6 bg-gray-200    rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-black-600 peer-checked:bg-red-600 dark:peer-checked:bg-red-600"></div>
            <span class="ms-3 text-sm font-medium text-black">High Priorty</span>
          </label>

          <div><button type="submit"  className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-xl">Create Task</button></div>
        </form>
      </div>
    </>
  );
};

export default CreateTaskForm;
