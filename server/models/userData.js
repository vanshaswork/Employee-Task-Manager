import mongoose from 'mongoose';

const AdminDataSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
});

export const userData = mongoose.model('user', AdminDataSchema);