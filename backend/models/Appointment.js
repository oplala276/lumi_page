import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema(
  {
    // Auto-generated Appointment ID (APPT-2026-FEB-0001)
    // appointmentId: {
    //   type: String,
    //   unique: true,
    //   index: true,
    // },

    // // Doctor Info
    // doctorName: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },

    // specialization: {
    //   type: String,
    //   trim: true,
    // },

    // // Date & Time
    // appointmentDate: {
    //   type: Date,
    //   required: true,
    // },

    // timeSlot: {
    //   type: String,
    //   required: true,
    //   enum: [
    //     "Morning",
    //     "Mid Morning",
    //     "Noon",
    //     "Afternoon",
    //     "Evening",
    //     "Late Evening",
    //   ],
    // },

    // // Mode
    // consultationMode: {
    //   type: String,
    //   enum: ["In-person", "Teleconsultation"],
    //   default: "In-person",
    // },

    // // Follow-up
    // followUpNeeded: {
    //   type: Boolean,
    //   default: false,
    // },

    // nextAppointmentDate: {
    //   type: Date,
    // },

    // // Status
    // appointmentStatus: {
    //   type: String,
    //   enum: ["Scheduled", "Confirmed", "Rescheduled", "Completed", "Cancelled"],
    //   default: "Scheduled",
    // },

    // // Remarks
    // remarks: {
    //   type: String,
    //   trim: true,
    // },

    // // Patient Contact
    // patientMobileNumber: {
    //   type: String,
    //   match: [/^[6-9]\d{9}$/, "Invalid mobile number"],
    // },

    // patientEmail: {
    //   type: String,
    //   lowercase: true,
    //   trim: true,
    //   match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"],
    // },

    // // Confirmation
    // confirmationSent: {
    //   type: String,
    //   enum: ["Yes", "No"],
    //   default: "No",
    // },

    // // Scheduled By
    // scheduledBy: {
    //   type: String,
    //   enum: ["Doctor", "Volunteer", "Self", "Camp", "Others"],
    // },

    // schedulerName: {
    //   type: String,
    //   trim: true,
    // },

    // Link Patient (Optional but BEST PRACTICE)
    // patientId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Patient",
    // },
  appointmentId: { type: String, unique: true },
  patientId: String,
    doctorName:String,
    specialization : String,
    appointmentDate: String,
    timeSlot : String,
    consultationMode: String,     
  followUpNeeded: Boolean,
  nextAppointmentDate: String,
  appointmentStatus: String,
  remarks: String,
  patientMobileNumber: String,
  patientEmail: String,
  confirmationSent: String,
  scheduledBy: String,
  schedulerName: String},
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
