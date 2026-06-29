import { Schema, mongoose } from "mongoose";
import bcrypt from "bcrypt";

const AdminSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
});

// method to encrypt password
AdminSchema.methods.setPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(password, salt);
};

// method to compare and validate password
AdminSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.passwordHash);
};

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
