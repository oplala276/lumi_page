import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Paper, Grid, Typography, Box, Avatar } from "@mui/material";

export default function ViewPatient() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
  const load = async () => {
    try {
      const [patientRes, prescriptionRes] = await Promise.all([
        fetch(`https://lumi-page-api.onrender.com/api/patient/${id}/details`),
        fetch(`https://lumi-page-api.onrender.com/api/patient/${id}/getprescriptions`)
      ]);

      const patientData = await patientRes.json();
      const prescriptionData = await prescriptionRes.json();

      setPatient(patientData.patient);
      setPrescriptions(prescriptionData.prescriptions || []);
if (patientData.photoUrl) {
        setPhotoUrl(patientData.photoUrl);
      }

      // If backend attaches photoUrl inside patient
      if (patientData.patient?.photoUrl) {
        setPhotoUrl(patientData.patient.photoUrl);
      }
    } catch (error) {
      console.error("Error loading data", error);
    }
  };

  load();
}, [id]);
  console.log("Patient data:", photoUrl, patient); // Debugging log
  if (!patient) return <div>Loading...</div>;

  return (
    <Paper sx={{ p: 3 }}>
  <Typography variant="h6" mb={2}>
    Patient Information
  </Typography>

  {/* ✅ NEW GRID LAYOUT */}
  <Grid container spacing={3} alignItems="center">
    
    {/* LEFT SIDE: Text Details */}
    <Grid item xs={12} md={8}>
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
    </Grid>

    {/* RIGHT SIDE: Photo */}
    <Grid item xs={12} md={4} display="flex" justifyContent="center">
      <Avatar
        src={photoUrl}
        alt={patient.fullName}
        variant="rounded" // Use "rounded" for a more professional form look
        sx={{ width: 160, height: 160, border: '1px solid #ddd' }}
      />
    </Grid>
  </Grid>

  <Typography variant="h6" mt={4} mb={2}>
    Doctor Prescriptions
  </Typography>
      
     {prescriptions.length === 0 && (
        <Typography>No prescriptions found.</Typography>
      )}

      {prescriptions.map((p, index) => (
        <Paper key={p._id} sx={{ p: 2, mb: 2, background: "#fafafa" }}>
          <Typography variant="subtitle1">
            Prescription #{index + 1}
          </Typography>

          <Box>
            <b>Date:</b>{" "}
            {new Date(p.prescriptionDate).toLocaleDateString()}
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
  {/* ... rest of your prescription mapping logic ... */}
</Paper>

    // <Paper sx={{ p: 3 }}>
    //   <Typography variant="h6" mb={2}>
    //     Patient Information
    //   </Typography>

    //   {/* ✅ PHOTO SECTION */}
    //   <Box display="flex" justifyContent="center" mb={3}>
    //     <Avatar
    //       src={photoUrl}
    //       alt={patient.fullName}
    //       sx={{ width: 140, height: 140 }}
    //     />
    //   </Box>

    //   <Box mb={1}>
    //     <b>Name:</b> {patient.fullName}
    //   </Box>
    //   <Box mb={1}>
    //     <b>Patient ID:</b> {patient.patientId}
    //   </Box>
    //   <Box mb={1}>
    //     <b>Age / Gender:</b> {patient.age} / {patient.gender}
    //   </Box>
    //   <Box mb={1}>
    //     <b>Mobile:</b> {patient.mobile}
    //   </Box>
    //   <Box mb={1}>
    //     <b>Address:</b> {patient.address?.city}, {patient.address?.state} -{" "}
    //     {patient.address?.pincode}
    //   </Box>

    //   <Typography variant="h6" mt={4} mb={2}>
    //     Doctor Prescriptions
    //   </Typography>

    //   {prescriptions.length === 0 && (
    //     <Typography>No prescriptions found.</Typography>
    //   )}

    //   {prescriptions.map((p, index) => (
    //     <Paper key={p._id} sx={{ p: 2, mb: 2, background: "#fafafa" }}>
    //       <Typography variant="subtitle1">
    //         Prescription #{index + 1}
    //       </Typography>

    //       <Box>
    //         <b>Date:</b>{" "}
    //         {new Date(p.prescriptionDate).toLocaleDateString()}
    //       </Box>
    //       <Box>
    //         <b>Diagnosis:</b> {p.diagnosis}
    //       </Box>
    //       <Box>
    //         <b>Complaints:</b> {p.complaints}
    //       </Box>

    //       <Box mt={1}>
    //         <b>Clinical Examination:</b>
    //         <div>BP: {p.bp}</div>
    //         <div>Pulse: {p.pulse}</div>
    //         <div>Temp: {p.temperature}</div>
    //         <div>Weight: {p.weight}</div>
    //       </Box>

    //       <Box mt={1}>
    //         <b>Medicines:</b>
    //         {p.medicines.map((m, i) => (
    //           <div key={i}>
    //             • {m.name} – {m.dose}, {m.frequency}, {m.duration}
    //           </div>
    //         ))}
    //       </Box>

    //       <Box mt={1}>
    //         <b>Doctor:</b> {p.doctorName} ({p.qualification})
    //       </Box>
    //     </Paper>
    //   ))}
    // </Paper>
  );
}