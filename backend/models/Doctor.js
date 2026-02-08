
import mongoose from 'mongoose';
const doctorSchema = mongoose.Schema({
  name: String,
  specialization: String,
  department: String,
});
export default mongoose.model("Doctor", doctorSchema);
