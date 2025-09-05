import mongoose from 'mongoose';

const employeeDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  loginEmail: { type: String, required: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: "https://www.w3schools.com/howto/img_avatar.png" },
  department: { type: String, required: true },
  empId: { type: Number, required: true, unique: true },
  currentTask: { type: mongoose.Schema.Types.ObjectId, ref: 'task' },
  pendingTask: [{ type: mongoose.Schema.Types.ObjectId, ref: 'task' }],
  completedTask: [{ type: mongoose.Schema.Types.ObjectId, ref: 'task' }],
  submitedReports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'task' }],
  deadlinePassed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'task' }],
  employeeStatus: { type: String, default: 'Inactive', enum: ['Active', 'Inactive'] },
});


const tasksDataSchema = new mongoose.Schema({
  taskname: { type: String, required: true },
  desc: { type: String },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'employee' },
  deadline: { type: Date },
  priorty: { type: String, enum: ['Low', 'High'], default: 'Low' },
  status: {
    type: String,
    enum: ["🔵Not Started Yet", "🟢In Progress", "✅Completed", "❌Failed"],
    default: "🔵Not Started Yet"
  },
  assignedDate: { type: Date, default: Date.now },
  completedDate: { type: Date },


});


export const EmpolyeeData = mongoose.model('employee', employeeDataSchema)
export const tasksData = mongoose.model('task', tasksDataSchema)