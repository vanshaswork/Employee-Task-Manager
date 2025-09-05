import express from 'express'
import cors from 'cors'
const app = express()
const port = 3000
import mongoose from 'mongoose';
import { userData } from './models/userData.js';
import { EmpolyeeData } from './models/tasks.js';
import { tasksData } from './models/tasks.js'



main().catch(err => console.log(err));

app.use(cors())
app.use(express.json())

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mydatabase');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}



app.get('/', async (req, res) => {
  try {
    const users = await userData.find();
    const employees = await EmpolyeeData.find()
      .populate('currentTask')
      .populate('pendingTask')
      .populate('completedTask')
      .populate('submitedReports')
      .populate('deadlinePassed');
    const tasks = await tasksData.find().populate('assignedTo');

    let totalCompletedTasks = 0;
    let totalPendingTasks = 0;

    employees.forEach(employee => {
      totalCompletedTasks += employee.completedTask.length;
      totalPendingTasks += employee.pendingTask.length;
    });

    let assignedTask = 0;
    let unassignedTask = 0;

    tasks.forEach(task => {
      if (task.assignedTo) {
        assignedTask++;
      } else {
        unassignedTask++;
      }
    }
    );


    res.json({
      users,
      employees,
      tasks,
      totalCompletedTasks,
      totalPendingTasks,
      unassignedTask,
      assignedTask,

    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/', async (req, res) => {
  try {

    const { taskname, desc, assignedTo, deadline, priorty } = req.body;

    const employee = await EmpolyeeData.findById(assignedTo);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const taskData = new tasksData({
      taskname,
      desc,
      assignedTo,
      deadline,
      priorty
    })
    await taskData.save()



    if (!employee.currentTask) {
      employee.currentTask = taskData._id;
    } else {
      employee.pendingTask.push(taskData._id);
    }



    await employee.save();


    res.send({ success: true, message: 'Data inserted successfully!', });
  } catch (error) {
    console.error('Error saving task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/addemployee', async (req, res) => {
  try {

    const { name,
      email,
      loginEmail,
      password,
      phone,
      profilePic,
      department,
      empId,
    } = req.body;

    if (!name || !email || !loginEmail || !password || !phone || !department || !empId) {
      return res.status(400).json({ success: false, message: "All required fields must be filled." });
    }


    const employeeData = new EmpolyeeData({
      name,
      email,
      loginEmail,
      password,
      phone,
      profilePic,
      department,
      empId,
    })
    await employeeData.save()

    res.send({ success: true, message: 'Employee Added successfully!', });
  } catch (error) {
    console.error('Error saving task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await tasksData.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (result.assignedTo) {
      const employee = await EmpolyeeData.findById(result.assignedTo);
      if (employee) {
        if (employee.currentTask?.toString() === id) {
          employee.currentTask = null;
        }
        employee.pendingTask = employee.pendingTask.filter(
          taskId => taskId.toString() !== id
        );

        employee.completedTask = employee.completedTask.filter(
          taskId => taskId.toString() !== id
        );

        await employee.save()
      }
    }

    res.status(200).json({ message: 'Task deleted successfully' });

  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/deleteemployee/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await EmpolyeeData.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/updateemployee/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, loginEmail, password, phone, profilePic, department, empId } = req.body;
  try {
    const result = await EmpolyeeData.findByIdAndUpdate(id, {
      name,
      email,
      loginEmail,
      password,
      phone,
      profilePic,
      department,
      empId
    }, { new: true, runValidators: true });
    if (!result) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee updated successfully', employee: result });
  } catch (error) {
    console.error('Error updating employee:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/updateEmployeeStatus/:id', async (req, res) => {
  const { id } = req.params;
  const { employeeStatus } = req.body;
  try {
    const employee = await EmpolyeeData.findByIdAndUpdate(id, { employeeStatus }, { new: true });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee status updated successfully', employee });
  } catch (error) {
    console.error('Error updating employee status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.put('/updateTaskStatus/:id', async (req, res) => {
  const { id } = req.params;
  const { status, completedDate } = req.body;

  try {
      const updateData = { status };

    if (completedDate) {
      updateData.completedDate = completedDate;
    }
    const task = await tasksData.findByIdAndUpdate(id, updateData, { new: true });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // find employee linked to this task
    const employee = await EmpolyeeData.findById(task.assignedTo);
    if (employee) {
      // If task is marked completed ✅
      if (status === "✅Completed") {
        // move from pendingTask → completedTask
        employee.completedTask.push(task._id);
        employee.pendingTask = employee.pendingTask.filter(
          taskId => taskId.toString() !== task._id.toString()

        );

        // If currentTask is this one, set to next pending or null
        if (employee.currentTask?.toString() === task._id.toString()) {
          if (employee.pendingTask.length > 0) {
            employee.currentTask = employee.pendingTask[0];
          } else {
            employee.currentTask = null;
          }
        }
      }

      // If task is re-opened to "🟢In Progress"
      if (status === "🟢In Progress") {
        if (!employee.pendingTask.includes(task._id)) {
          employee.pendingTask.push(task._id);
        }
        employee.completedTask = employee.completedTask.filter(
          taskId => taskId.toString() !== task._id.toString()
        );
      }

      await employee.save();
    }

    res.status(200).json({ message: 'Task status updated successfully', task, employee });
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Employee Task Manager app listening on port ${port}`)
})
