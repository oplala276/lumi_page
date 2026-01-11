import Patient from "../models/Patient.js";
import Counterid from "../models/Counterid.js";

export async function createPatient(req, res) {
  try {
    const data = req.body;

    const counter = await Counterid.findOneAndUpdate(
      { name: "patient" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    const patientId = `PT_${String(counter.seq).padStart(7, "0")}`;
    // Add uploaded file if exists
    if (req.file) {
      data.file = req.file.filename;
    }
    // const patient = await Patient.create({patientId, data});
    const patient = await Patient.create({...data, patientId });
    res.status(201).json({
      success: true,
      message: `${patientId} registered successfully`,
      patient,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function getPatients(req, res) {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.json({ success: true, patients });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function getPatientById(req, res) {
  try {
    const patient = await Patient.findById(req.params.id);
    res.json({ success: true, patient });
  } catch {
    res.status(500).json({ success: false });
  }
};

export async function deletePatient(req, res){
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch {
    res.status(500).json({ success: false });
  }
};
