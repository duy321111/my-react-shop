// models/Admin.js
import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  adminUser: {
    type: String,
    required: true,
    unique: true,
  },
  adminPass: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;
