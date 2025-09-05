import React from 'react'
import Dasboard from './admin/dashboard'
import Tasks from './admin/tasks'
import { useState } from 'react'
import Setting from './admin/setting'
import Employees from './admin/employees'

const Admindashboard = (props) => {
  const [page, setPage] = useState('dashboard')


  return (


    <div>
      <div className="contanier flex h-screen w-full">
        <div className="navigation h-full w-[15%] bg-gray-900">
          <div className="heading h-[60px] flex items-center justify-center gap-1.5">
            <img className='mt-3' src="/images/adminProfile.svg" alt="" /> <h1 className='text-white text-[18px] font-bold mt-3'>Admin Dashboard</h1>
          </div>
          <div className="navs">
            <ul className='flex flex-col gap-2 p-4'>
              <li onClick={() => { setPage("dashboard") }} className='text-white text-[16px] font-semibold hover:bg-gray-600 p-2 rounded-md cursor-pointer flex gap-[13px] items-center justify-start'> <img src="/images/dashboard.svg" alt="" />Overview</li>
              <li onClick={() => { setPage('Employee') }} className='text-white text-[16px] font-semibold hover:bg-gray-600 p-2 rounded-md cursor-pointer flex gap-[13px] items-center justify-start'> <img src="/images/employees.svg" alt="" /> Employees</li>
              <li onClick={() => { setPage("task") }} className='text-white text-[16px] font-semibold hover:bg-gray-600 p-2 rounded-md cursor-pointer flex gap-[13px] items-center justify-start'> <img src="/images/tasks.svg" alt="" /> Tasks</li>
              <li onClick={()=>{setPage("setting")}} className='text-white text-[16px] font-semibold hover:bg-gray-600 p-2 rounded-md cursor-pointer flex gap-[13px] items-center justify-start'> <img src="/images/setting.svg" alt="" /> Settings</li>
              <li onClick={() => {
                props.setUser(null),
                localStorage.removeItem("loggedInUser")

              }} className='text-white text-[16px] font-semibold hover:bg-gray-600 p-2 rounded-md cursor-pointer flex gap-[13px] items-center justify-start'> <img src="/images/logout.svg" alt="" /> LogOut</li>
            </ul>
          </div>
        </div>

        {page === "dashboard" && <Dasboard count={props.count}  />}
        {page === "task" && <Tasks employeeData={props.employeeData} count={props.count} tasksData={props.tasksData}   />}
        {page === "setting" && <Setting />}
        {page === "Employee" && <Employees employeeData={props.employeeData} />}

      </div>
    </div>
  )
}

export default Admindashboard
