// import React, { use } from "react";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
// } from "recharts";
import { useEffect, useState } from "react";
import { useModal } from "../context/ModalContext";
import EmployeePendingTasks from "../employees/employeePendingTasks";
import { FetchDataContext } from "../context/fetchData";
import { useContext } from "react";
import EmployeeCompletedTasks from "../employees/employeeCompletedTasks";
import EmployeeOverdueTasks from "../employees/employeeOverdueTasks";

// const chartData = [
//   { name: "Week 1", pending: 3, completed: 8, failed: 1 },
//   { name: "Week 2", pending: 4, completed: 6, failed: 2 },
//   { name: "Week 3", pending: 2, completed: 9, failed: 1 },
//   { name: "Week 4", pending: 5, completed: 7, failed: 3 },
// ];

// const recentTasks = [
//   { title: "UI Design Update", status: "Completed", date: "2025-08-12" },
//   { title: "API Integration", status: "Pending", date: "2025-08-13" },
//   { title: "Bug Fix - Login", status: "Failed", date: "2025-08-14" },
//   { title: "Dashboard Redesign", status: "Completed", date: "2025-08-15" },
// ];



const Employeedashboard = () => {
  const [data, setData] = useState({})

  const [checked, setChecked] = useState(false)

  const { fetchData } = useContext(FetchDataContext);

  const { closeModal, openModal } = useModal();

  const todayTasks = data.pendingTask?.filter(task => {
    const taskDate = new Date(task.assignedDate);
    const today = new Date();
    return taskDate.toDateString() === today.toDateString();
  });

  useEffect(() => {
    const employeeData = localStorage.getItem('employeeData');
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/`);
        const result = await response.json();

        const employee = result.employees.find(emp => emp._id === employeeData);
        if (!employee) {
          console.error('Employee not found');
          return;
        }
        setData(employee);
           setChecked(employee.employeeStatus === "Active");
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchData();

  }, [])




  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("employeeData");
    window.location.reload();
  };


  const handleCheckbox = (e) => {
    const newChecked = e.target.checked;
    setChecked(newChecked);

    const status = newChecked ? "Active" : "Inactive";

    fetch(`http://localhost:3000/updateEmployeeStatus/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ employeeStatus: status }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Employee status updated:", data);
        setData((prev) => ({ ...prev, employeeStatus: status }));

        fetchData(); // Re-fetch data to update the UI
      })
      .catch((err) => {
        console.error("Error updating employee status:", err);
      });

  };




  const handlePendingTaskView = () => {
    openModal(
      <EmployeePendingTasks data={data} />
    );
  }
  const handleCompletedTaskView = () => {
    openModal(
      <EmployeeCompletedTasks data={data} />
    );
  }

  const handleOverdueTasksView = () => {
    openModal(
      <EmployeeOverdueTasks data={data} />
    );
  }


  return (
    <div className=" flex justify-center items-center min-h-screen w-full bg-gray-50 p-6">
      <div className="min-h-screen w-[70vw] bg-gray-50 p-6">
        {/* Header */}
        <header className="flex items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="profile"
              className="w-14 h-14 rounded-full"
            />
            <div>
              {data && <h1 className="text-2xl font-bold">Good evening, {data.name}!</h1>}
              <p className="text-gray-600">
                You have {todayTasks?.length} tasks pending today
              </p>
            </div>
          </div>
          <div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" onChange={handleCheckbox} checked={checked} className="sr-only peer" />

              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-grren-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-500"></div>
              {checked ?
                <span className="ms-3 cursor-ponter px-3 py-1 rounded-lg text-sm font-medium bg-green-100 text-green-600">Online</span> :
                <span className="ms-3 cursor-ponter px-3 py-1 rounded-lg text-sm font-medium bg-yellow-100 text-yellow-600">Offline</span>
              }
            </label>
          </div>
          <div className="flex items-center gap-4">
            <h1 className=" flex gap-1 cursor-pointer hover:blue-red-600 hover:underline font-extrabold text-blue-500">  View Profile</h1>
            <h1 onClick={handleLogout} className=" flex gap-1 cursor-pointer hover:text-red-600 hover:underline font-extrabold text-red-500"> <img src="/images/logout2.svg" alt="" /> LogOut</h1>
          </div>
        </header>

        {/* Task Overview */}

        {checked ? (
          <>
            <section className="mt-8">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Task Overview</h2>

              </div>
              <div className="grid grid-cols-4 gap-4 mt-4">
                <div onClick={handlePendingTaskView} className="bg-yellow-300 rounded-lg p-4 text-center cursor-pointer">
                  <p className="text-3xl font-bold">{data.pendingTask?.length}</p>
                  <p>Pending Tasks</p>
                </div>
                <div onClick={handleCompletedTaskView} className="bg-green-300 rounded-lg p-4 text-center cursor-pointer">
                  <p  className="text-3xl font-bold">{data.completedTask?.length}</p>
                  <p>Completed This Week</p>
                </div>
                <div onClick={handleOverdueTasksView} className="bg-red-300 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold">{data.deadlinePassed?.length}</p>
                  <p>Overdue Tasks</p>
                </div>
                <div className="bg-blue-300 rounded-lg p-2 pl-3 flex justify-between">
                  <div>
                    <span className="flex flex-col items-start text-sm font-medium">
                      <p>Current Task Info</p>
                    </span>
                    <p className="text-2xl font-bold">{data.currentTask?.length === 0 ? "No Task Assigned" : data.currentTask?.taskname}</p>
                    <p className="text-sm ">{data.currentTask?.assignedDate
                      ? new Date(data.currentTask.assignedDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })
                      : ""}</p>
                  </div>
                  <div><span>Deadline</span></div>
                </div>
              </div>
            </section>

            {/* Progress Chart (placeholder) */}
            <section className="mt-8 bg-white rounded-lg p-6 shadow">
              <h3 className="text-lg font-semibold mb-4">Progress</h3>
              <div className="h-40 bg-gray-100 flex items-center justify-center text-gray-400">
                Chart Placeholder
              </div>
            </section>

            {/* Bottom Grid */}
            <section className="mt-8 grid grid-cols-3 gap-6">
              {/* Tasks List */}
              <div className="col-span-2 bg-white rounded-lg p-6 shadow">
                <div className="flex gap-6 border-b pb-2">
                  <button className="font-semibold  hover:underline cursor-pointer">Today</button>
                  <button className="font-semibold hover:underline cursor-pointer">Upcoming</button>
                  <button className="font-semibold hover:underline cursor-pointer">Overdue</button>
                </div>
                <div className="space-y-4 overflow-y-scroll h-[400px] mt-4">
                  {todayTasks && todayTasks.length > 0 ? (
                    todayTasks.map((task, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                        <div>
                          <p className="font-medium">{task.taskname}</p>
                          <p className="text-gray-500 text-sm">{task.desc}</p>
                        </div>
                        <span className=" cursor-pointer px-3 py-1 rounded-lg text-sm font-medium bg-blue-100 text-blue-600">
                          Mark as Completed
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500">No tasks for today</div>
                  )}



                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Achievements */}
                <div className="bg-white rounded-lg p-6 shadow">
                  <h3 className="font-semibold">Achievements</h3>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-yellow-500 text-2xl">⭐</span>
                    <div>
                      <p className="font-medium">Speedy Finisher</p>
                      <p className="text-sm text-gray-500">Earned 250 points</p>
                    </div>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-green-500 h-2 rounded-full w-1/2"></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Progress: 500 pts</p>
                </div>

                {/* Reminders */}
                <div className="bg-white rounded-lg p-6 shadow">
                  <h3 className="font-semibold">Reminders</h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    <li>
                      <span className="font-medium">Dec 5</span> - Prepare presentation
                    </li>
                    <li>
                      <span className="font-medium">Dec 6</span> - Update user profile
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </>
        ) : (

          <div className="text-center mx-auto mt-20 p-6 ">

            <h1 className="text-2xl font-bold mb-2">You are currently offline</h1>
            <p className="text-gray-600">Please switch online to view your Stats.</p>

          </div>



        )}


      </div>
    </div>
  );
}


export default Employeedashboard;
