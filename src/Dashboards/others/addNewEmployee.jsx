import React from 'react'
import { useModal } from '../../context/ModalContext'
import { useState } from 'react'
import { useContext } from 'react'
import { FetchDataContext } from '../../context/fetchData';

const AddNewEmployee = () => {

  const { closeModal } = useModal()
    const {fetchData} = useContext(FetchDataContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    loginEmail: "",
    password: "",
    phone: "",
    profilePic: "",
    department: "",
    empId: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,


    });
  };

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:3000/addemployee",{
          method: "POST",
          headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
      });
      
      closeModal()        
      if (response.ok) {
        alert("Employee Added")
      }else{
        alert("Error While Adding Employee")
      }

      
    } catch (error) {
      console.error(error)
    }

    await fetchData()
  }
  

  return (
    <div className='place-items-center w-[565px]'>

      <h2 className="text-xl font-bold mb-4">Add New Employee</h2>
      <form onSubmit={handleSubmit} method='post' className="space-y-3 w-[90%]">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            onChange={handleChange}
            value={formData.name}
            type="text"
            name="name"
            className="w-full border rounded p-2"

          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            onChange={handleChange}
            value={formData.email}
            type="email"
            name="email"
            className="w-full border rounded p-2"

            required
          />
        </div>
      <div className='flex justify-between w-full'>
        <div className='w-[58%]'>
          <label className="block mb-1 font-medium">
            Login Email{" "}
            <span className="text-sm text-gray-500">
              (same as Email if applicable)
            </span>
          </label>
          <input
            onChange={handleChange}
            value={formData.loginEmail}
            type="email"
            name="loginEmail"
            className="w-full border rounded p-2"

          />
        </div>

        <div className='w-[40%]'>
          <label className="block mb-1 font-medium">Password</label>
          <input
            onChange={handleChange}
            value={formData.password}
            type="password"
            name="password"
            className="w-full border rounded p-2"

          />
        </div>

        </div>

        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            onChange={handleChange}
            value={formData.phone}
            type="tel"
            name="phone"
            className="w-full border rounded p-2"

          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Profile Picture URL</label>
          <input
            onChange={handleChange}
            value={formData.profilePic}
            type="text"
            name="profilePic"
            className="w-full border rounded p-2"

          />
        </div>
      <div className='flex justify-between w-full'>
        <div className='w-[58%]'>
          <label className="block mb-1 font-medium">Department</label>
          <input
            onChange={handleChange}
            value={formData.department}
            type="text"
            name="department"
            className="w-full border rounded p-2"

          />
        </div>
        <div className='w-[40%]'>
          <label className="block mb-1 font-medium">EMP ID No</label>
          <input
            onChange={handleChange}
            value={formData.empId}
            type="text"
            name="empId"
            className="w-full border rounded p-2"

          />
        </div>

        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Add Employee
          </button>
        </div>
      </form>

    </div>
  )
}

export default AddNewEmployee
