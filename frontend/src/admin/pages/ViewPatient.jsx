import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Paper, Typography, Box } from "@mui/material";

export default function ViewPatient() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);

  // useEffect(() => {
  //   const load = async () => {
  //     const res = await fetch(`https://lumi-page-api.onrender.com/api/patient/${id}`);
  //     const data = await res.json();
  //     setPatient(data.patient);
  //   };
  //   load();
  // }, [id]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(
        `https://lumi-page-api.onrender.com/api/patient/${id}/details`,
      );
      const data = await res.json();

      setPatient(data.patient);
      setPrescriptions(data.prescriptions || []);
    };
    load();
  }, [id]);
  if (!patient) return <div>Loading...</div>;

  return (
    <Paper sx={{ p: 3 }}>
      {/* <Typography variant="h5" mb={3}>
        Patient Details
      </Typography>

      {Object.keys(patient).map((key) => (
        <Box key={key} mb={1}>
          <strong>{key.toUpperCase()}:</strong> {String(patient[key])}
        </Box>
      ))}

      {patient.file && (
        <Box mt={2}>
          <a
            href={`https://lumi-page.onrender.com/uploads/${patient.file}`}
            target="_blank"
            rel="noreferrer"
          >
            View Uploaded File
          </a>
        </Box>
      )} */}
      <Typography variant="h6" mb={2}>
        Patient Information
      </Typography>

      <Box mb={1}>
        <b>Name:</b> {patient.fullName}
      </Box>
      <Box mb={1}>
        <b>Patient ID:</b> {patient.patientId}
      </Box>
      <Box mb={1}>
        <b>Age / Gender:</b> {patient.age} / {patient.gender}
      </Box>
      <Box mb={1}>
        <b>Mobile:</b> {patient.mobile}
      </Box>
      <Box mb={1}>
        <b>Address:</b> {patient.address?.city}, {patient.address?.state} -{" "}
        {patient.address?.pincode}
      </Box>

      <Typography variant="h6" mt={4} mb={2}>
        Doctor Prescriptions
      </Typography>

      {prescriptions.length === 0 && (
        <Typography>No prescriptions found.</Typography>
      )}

      {prescriptions.map((p, index) => (
        <Paper key={p._id} sx={{ p: 2, mb: 2, background: "#fafafa" }}>
          <Typography variant="subtitle1">Prescription #{index + 1}</Typography>

          <Box>
            <b>Date:</b> {new Date(p.prescriptionDate).toLocaleDateString()}
          </Box>
          <Box>
            <b>Diagnosis:</b> {p.diagnosis}
          </Box>
          <Box>
            <b>Complaints:</b> {p.complaints}
          </Box>

          <Box mt={1}>
            <b>Clinical Examination:</b>
            <div>BP: {p.bp}</div>
            <div>Pulse: {p.pulse}</div>
            <div>Temp: {p.temperature}</div>
            <div>Weight: {p.weight}</div>
          </Box>

          <Box mt={1}>
            <b>Medicines:</b>
            {p.medicines.map((m, i) => (
              <div key={i}>
                • {m.name} – {m.dose}, {m.frequency}, {m.duration}
              </div>
            ))}
          </Box>

          <Box mt={1}>
            <b>Doctor:</b> {p.doctorName} ({p.qualification})
          </Box>
        </Paper>
      ))}
    </Paper>
  );
}
