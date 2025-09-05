import Login from "./components/login"
import React, { useState, useEffect } from 'react';
import Admindashboard from "./Dashboards/admindashboard"
import Employeedashboard from "./Dashboards/employeedashboard"

import Modal from "./Dashboards/others/modals";

import { useContext } from 'react';
import { FetchDataContext } from "./context/fetchData.jsx";


function AppContent() {

    const { data, fetchData } = useContext(FetchDataContext);
    const [loggedInUser, setloggedInUser] = useState(null)

    const [user, setUser] = useState(null)
    const [adminData, setAdminData] = useState("")
    const [employeeData, setEmployeeData] = useState("")
    const [count, setCount] = useState({
        assignCount: 0,
        unassignedCount: 0,
        pendingCount: 0,
        completedCount: 0,
    })
    const [tasksData, setTasksData] = useState("")


    useEffect(() => {
        fetchData(); 
        const loggedInUser = localStorage.getItem("loggedInUser");
        setUser(loggedInUser || null);
    }, []); 

    useEffect( () => {
    
        if (data) {
            setAdminData(data.users || []);
            setEmployeeData(data.employees || []);
            setTasksData(data.tasks || []);
            setCount({
                assignCount: data.assignedTask || 0,
                unassignedCount: data.unassignedTask || 0,
                pendingCount: data.totalPendingTasks || 0,
                completedCount: data.totalCompletedTasks || 0,
            });
        }
    }, [data]);


    const handleUser = async (email, password) => {
        await fetchData();
        if (!data) {
            console.error('No data received');
            return;
        }
        
    const isAdmin = data.users?.find(u => u.email === email && u.password === password);
    const isEmployee = data.employees?.find(u => u.email === email && u.password === password);

        if (isAdmin) {
            localStorage.setItem("loggedInUser", "Admin");
            setUser("Admin");
        } else if (isEmployee) {
            localStorage.setItem("loggedInUser", "Employee");
            localStorage.setItem('employeeData', isEmployee._id);
            setUser("Employee");
        } else {
            alert("Invalid Credentials")
        }

        
    }
    return (

        <>



            {!user ? <Login handleLogin={handleUser} /> : ""}
            {user === "Admin" && <Admindashboard setUser={setUser} employeeData={employeeData} tasksData={tasksData} count={count} />}
            {user === "Employee"? <Employeedashboard/> : null}

        </>
    )
}


export default AppContent
