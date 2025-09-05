import React, { useContext } from 'react'
import { useState } from 'react'
import { useModal } from '../../context/ModalContext'
import CreateTaskForm from '../others/CreateTaskForm'
import AddNewEmployee from '../others/addNewEmployee'
import { FetchDataContext } from '../../context/fetchData'
import EditEmployee from '../others/editEmployee'
import Employeeinfo from '../others/employeeinfo'

const Employees = ({ employeeData }) => {
  const [onOpenDropDownMenu, setOnOpenDropDownMenu] = useState(false)
  const { openModal, closeModal } = useModal()
  const { fetchData } = useContext(FetchDataContext);
  const [searchQuery, setSearchQuery] = useState("")


  const handleOpen = () => {
    openModal(
      <AddNewEmployee />
    )
  }

  const activeEmployees = employeeData.filter(employee => employee.employeeStatus === 'Active').length;
  const offlineEmployees = employeeData.filter(employee => employee.employeeStatus === 'Inactive').length;

  const filteredEmployees = employeeData.filter(employee => {
    const query = searchQuery.toLowerCase();
    return (
      employee.name?.toLowerCase().includes(query) ||
      employee.email?.toLowerCase().includes(query)
    )
  });

  const handleEditEmployee = (id) => {
    const selectedEmployee = employeeData.find(emp => emp._id === id);
    if (!selectedEmployee) {
      console.error('Employee not found');
      return;
    }
    openModal(
      <EditEmployee employeeData={selectedEmployee} />
    )
  }

  const handleView = (id) => {
    const selectedEmployee = employeeData.find(emp => emp._id === id);
    if (!selectedEmployee) {
      console.error('Employee not found');
      return;
    }
    openModal(
      <Employeeinfo employee={selectedEmployee} />
    )
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/deleteemployee/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const res = await response.json();
        console.error("❌ Failed to delete:", res?.message || 'Unknown error');
        return;
      }


    } catch (error) {
      console.error("🔥 Caught exception:", error);
    }

    fetchData()
  };
  return (
    <>
      <div className="contanier w-[85%] h-screen space-y-3 bg-gray-200">
        <div className="heading flex justify-between">
          <h1 className='text-3xl ml-[45px] mt-[25px] font-bold'>Employee Task Manager</h1>
          <div>
            <button onClick={handleOpen} className=' hover:bg-blue-700 mr-[45px] mt-[30px] font-bold  cursor-pointer border px-4 py-2 rounded-xl flex justify-center items-center gap-2 bg-blue-600 text-white ' >
              <img src="/images/employee.png" className='w-6' alt="" />  Add Employee
            </button>
          </div>
        </div>
        <div className="boxs flex justify-center items-center mt-5 mb-0">
          <div className="box1 flex gap-3 w-[280px] h-[110px] bg-white m-3 p-5  rounded-xl">
            <div>
              <img className='w-[70px]' src="/images/active.png" alt="" />
            </div>
            <div>
              <h1 className='text-[18px] font-bold'>Active Employees </h1>
              <p className='text-3xl font-extrabold mt-0.5'>{activeEmployees}</p>
            </div>
          </div>
          <div className="box1 flex gap-3 w-[280px] h-[110px] bg-white m-3 p-5 rounded-xl ">
            <div>
              <img className='w-[70px]' src="/images/offline.png" alt="" />
            </div>
            <div>
              <h1 className='text-[18px] font-bold'>Offline Employees</h1>
              <p className='text-3xl font-extrabold mt-0.5'>{offlineEmployees}</p>
            </div>
          </div>
          <div className="box1 flex gap-3 w-[280px] h-[110px] bg-white m-3 p-5 rounded-xl">
            <div>
              <img className='w-[70px]' src="/images/done.png" alt="" />
            </div>
            <div>
              <h1 className='text-xl font-bold'>On Leave</h1>
              <p className='text-3xl font-extrabold mt-0.5'>2</p>
            </div>
          </div>
          <div className="box1 flex gap-3 w-[280px] h-[110px] bg-white m-3 p-5 rounded-xl ">
            <div>
              <img className='w-[70px]' src="/images/pending.png" alt="" />
            </div>
            <div>
              <h1 className='text-xl font-bold'>Off Leave</h1>
              <p className='text-3xl font-extrabold mt-0.5'>6</p>
            </div>
          </div>
        </div>
        <div className='w-full h-[50px] flex justify-center items-center'>
          <div className='w-[91%] h-full bg-white rounded-xl flex pl- gap-25 items-center text-gray-500 font-medium'>
            <div className="heading flex items-center justify-between px-5 w-full h-[15%]  ">


              <div></div>
              <div className=' relative rounded-xl w-[250px] h-[40px] bg-gray-200'>
                <img className='absolute bottom-[8px] left-2' src="/images/search.svg" alt="" />
                <input
                  className=' pl-9 pr-1 pb-0.5 rounded-xl  w-full h-full'
                  placeholder='Search Employee  '
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value) }} />
              </div>
            </div>
          </div>
        </div>
        <div className='w-full h-[35px] flex justify-center items-center'>
          <div className='w-[91%] h-full bg-white rounded-xl flex pl-9 gap-25 items-center text-gray-500 font-medium'>
            <span>EMP ID</span>
            <span >Profile</span>
            <span>Peronal Details</span>
            <div className='flex gap-11'>
              <span>Completed Tasks</span>
              <span>Submited Reports</span>
              <span>Pending Tasks</span>
              <span>Deadline Passed</span>

            </div>
          </div>
        </div>

        <div className='employeescards w-full h-[350px]  flex-col flex  items-center space-y-3 mt-5'>
          {filteredEmployees.length === 0 ? (
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500 font-bold'>
              No Employees Found
            </div>
          ) : (
            filteredEmployees.map((employee) => (

              <div key={employee._id} onClick={() => handleView(employee._id)} className="employeecard w-[91%] h-[98px] bg-gray-800 rounded-xl flex pl-5 gap-15 items-center cursor-pointer ">
                <div className="empid w-[7%] h-full  text-white flex justify-center items-center">
                  <div className='flex flex-col justify-center relative mt-2'>
                    <span className='absolute bottom-8.5 left-1 text-[12px] font-medium'>{employee.department}</span>
                    <h1 className='text-[30px] font-bold'>{employee.empId}</h1>
                  </div>
                </div>
                <div className="profile w-[8%]  h-full flex justify-center items-center">
                  <img className='h-18 w-18 rounded-full bg-cover ' src="https://www.w3schools.com/howto/img_avatar.png" alt="profile" />
                </div>
                <div className="personal w-[14%] h-full  ">
                  <div className='flex flex-col justify-center items-start h-full ml-2 space-y-0'>
                    <span className='text-white text-[17px] font-bold'>{employee.name}</span>
                    <span className='text-white text-[12px] font-medium'>{employee.email} </span>
                    <span className='text-white text-[12px] font-medium'>{employee.phone}</span>
                  </div>
                </div>

                <div className='flex  items-center h-full '>
                  <div className="completed  w-[160px] h-full flex ">
                    <div className="left w-[35%] h-full flex justify-center items-center">
                      <img src="/images/checkmark.png" alt="" />
                    </div>
                    <div className="right w-[65%] h-full flex flex-col justify-center ">
                      <span className='text-5xl text-white font-extrabold pl-1'>{employee?.completedTask.length}</span>
                      <span className='text-white hover:underline cursor-pointer text-[15px] pl-1 font-medium'>view</span>
                    </div>
                  </div>

                  <div className="submited  w-[160px] h-full flex">
                    <div className="left w-[40%]  h-full flex justify-center items-center">
                      <img src="/images/done2.png" alt="" />
                    </div>
                    <div className="right w-[60%] h-full flex flex-col justify-center ">
                      <span className='text-5xl text-white font-extrabold pl-1'>{employee?.submitedReports.length}</span>
                      <span className='text-white hover:underline cursor-pointer text-[15px] pl-1 font-medium'>view</span>
                    </div>
                  </div>
                  <div className="pending  w-[160px] h-full flex ">
                    <div className="left w-[40%]  h-full flex justify-center items-center">
                      <img src="/images/pending2.png" alt="" />
                    </div>
                    <div className="right w-[60%] h-full flex flex-col justify-center ">
                      <span className='text-5xl text-white font-extrabold pl-1'>{employee?.pendingTask.length}</span>
                      <span className='text-white hover:underline cursor-pointer text-[15px] pl-1 font-medium'>view</span>
                    </div>
                  </div>

                  <div className="pending  w-[130px] h-full flex ">
                    <div className="left w-[40%]  h-full flex justify-center items-center">
                      <img src="/images/warning.png" alt="" />
                    </div>
                    <div className="right w-[60%] h-full flex flex-col justify-center ">
                      <span className='text-5xl text-white font-extrabold pl-1'>{employee?.deadlinePassed.length}</span>
                      <span className='text-white hover:underline cursor-pointer text-[15px] pl-1 font-medium'>view</span>
                    </div>
                  </div>
                  <div onMouseEnter={() => { setOnOpenDropDownMenu(employee.empId) }} onMouseLeave={() => { setOnOpenDropDownMenu(null) }} className='relative w-[45px] h-full flex justify-center items-center'>
                    <img className='w-6' src="/images/menu.png" alt="" />



                    {onOpenDropDownMenu === employee.empId && (
                      <div
                        className="absolute top-15 mt-2 right-2 w-[130px] bg-[rgba(0,0,0,0.9)] rounded-xl overflow-hidden flex flex-col items-center py-3 gap-2 z-50"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div onClick={(e) => {
                          e.stopPropagation(); // stop bubbling
                          handleDelete(employee._id);
                        }} className='w-[90%] rounded-xl h-9 flex justify-center gap-1.5 items-center hover:bg-red-700'>
                          <img src="/images/remove.svg" alt="" />
                          <span className='text-white text-[15px] font-bold'>Terminate</span>
                        </div>
                        <div onClick={() => handleEditEmployee(employee._id)} className='w-[90%] rounded-xl h-9 flex justify-center gap-2.5 items-center hover:bg-yellow-500'>
                          <img src="/images/edit2.svg" alt="" />
                          <h1 className='text-white text-[15px] font-bold'>Edit EMP</h1>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}

        </div>
      </div>



    </>
  )
}

export default Employees
