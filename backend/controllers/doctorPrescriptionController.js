import DoctorPrescription from "../models/DoctorPrescription.js";
import Patient from "../models/Patient.js";

export const addDoctorPrescription = async (req, res) => {
  try {
    const { patientId } = req.params;
    const patientExists = await Patient.findById(patientId);
    if (!patientExists) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }

    const prescription = await DoctorPrescription.create({
      patientId,
      hospitalName: req.body.hospitalName,
      bp: req.body.bp,
      pulse: req.body.pulse,
      temperature: req.body.temperature,
      weight: req.body.weight,
      clinicalExamination: req.body.clinicalExamination,
      complaints: req.body.complaints,
      diagnosis: req.body.diagnosis,
      medicines: req.body.medicines,
      // investigations: req.body.investigations,
      advice: req.body.advice,
      followUp: req.body.followUp,
      doctorName: req.body.doctorName,
      qualification: req.body.qualification,
      registrationNo: req.body.registrationNo,
    });

    res.status(201).json({
      success: true,
      message: "Prescription added successfully",
      prescription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

 /* GET ALL PRESCRIPTIONS OF A PATIENT*/

export const getPatientWithPrescriptions = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const prescriptions = await DoctorPrescription.find({
      patientId: id,
    }).sort({ prescriptionDate: -1 });

    res.json({
      patient,
      prescriptions,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
