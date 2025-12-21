import mongoose from "mongoose";

const PatientSchema = mongoose.Schema(
  {
    patientId: { type: String, unique: true },
    registrationDate: String,
    fullName: String,
    age: Number,
    gender: String,

    mobile: String,
    whatsapp: String,
    guardian: String,
    emergency: String,
    email: String,
    relationship: String,

    address: {
      city: String,
      landmark: String,
      state: String,
      pincode: String,
    },

    referredBy: String,
    doctorName: String,
    volunteerName: String,
    selfName: String,
    campName: String,

    complaint: String,
    duration: String,
    observations: String,
    reviewedBy: String,
    reviewDate: String,
    diagnosis: String,

    caseType: [String],
    doctorRequired: String,
    expertise: String,
    currentTreatment: String,

    file: String, // store filename
  },
  { timestamps: true }
);

export default mongoose.model("Patient", PatientSchema);
