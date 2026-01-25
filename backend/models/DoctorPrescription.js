import mongoose from "mongoose";

const DoctorPrescriptionSchema = mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    // Clinical Examination
    hospitalName: String,
    bp: String,
    pulse: String,
    temperature: String,
    weight: String,

    complaints: String,
    diagnosis: String,

    // Medicines
    medicines: [
      {
        name: String,
        dose: String,
        frequency: String,
        duration: String,
      },
    ],

    // investigations: String,
    advice: String,
    followUp: String,

    // Doctor Details
    doctorName: String,
    qualification: String,
    registrationNo: String,

    prescriptionDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "DoctorPrescription",
  DoctorPrescriptionSchema
);
