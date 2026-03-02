import Patient from "../models/Patient.js";
import Counterid from "../models/Counterid.js";
import s3 from "../config/s3.js";

// export async function createPatient(req, res) {
//   try {
//     const data = { ...req.body };
//       if (data.address) {
//   data.address = JSON.parse(data.address);
// }
  
//     const counter = await Counterid.findOneAndUpdate(
//       { name: "patient" },
//       { $inc: { seq: 1 } },
//       { new: true, upsert: true }
//     );
//     const patientId = `PT_${String(counter.seq).padStart(7, "0")}`;
  
//     if (req.file) {
//       data.file = req.file.filename;
//     }
//     const patient = await Patient.create({...data, patientId });
//     res.status(201).json({
//       success: true,
//       message: `${patientId} registered successfully`,
//       patient,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// }
export async function createPatient(req, res) {
  try {
    const data = { ...req.body };

    if (data.address) {
      data.address = JSON.parse(data.address);
    }

    const counter = await Counterid.findOneAndUpdate(
      { name: "patient" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const patientId = `PT_${String(counter.seq).padStart(7, "0")}`;

    // 🔥 AWS S3 Upload URL
    if (req.file) {
      data.photo = req.file.key; // Store full S3 URL
    }

    // console.log("photo key:", req.file.key); // Debugging log
    const patient = await Patient.create({
      ...data,
      patientId,
    });

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

// export async function getPatientById(req, res) {
//   try {
//     const patient = await Patient.findById(req.params.id);
//     res.json({ success: true, patient });
//   } catch {
//     res.status(500).json({ success: false });
//   }
// };

export async function getPatientById(req, res) {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }

    let signedUrl = null;

    if (patient.photo) {
      signedUrl = s3.getSignedUrl("getObject", {
        Bucket: "patient-photo-storage-lumi",
        Key: patient.photo,
        Expires: 60 * 60 * 24, // 5 minutes
      });
    }

    res.json({
      success: true,
      patient,
      photoUrl: signedUrl,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function deletePatient(req, res){
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch {
    res.status(500).json({ success: false });
  }
};

export const checkPatientId = async (req, res) => {
  try {
    const patient = await Patient.findOne({ patientId: req.params.patientId });

    if (!patient) {
      return res.json({ exists: false }); 
    }

    res.json({ exists: true, patient });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
