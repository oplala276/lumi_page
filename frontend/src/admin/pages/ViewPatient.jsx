import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Paper, Typography, Box } from "@mui/material";

export default function ViewPatient() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`https://lumi-page-api.onrender.com/api/patient/${id}`);
      const data = await res.json();
      setPatient(data.patient);
    };
    load();
  }, [id]);

  if (!patient) return <div>Loading...</div>;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" mb={3}>
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
            href={`http://localhost:5000/uploads/${patient.file}`}
            target="_blank"
            rel="noreferrer"
          >
            View Uploaded File
          </a>
        </Box>
      )}
    </Paper>
  );
}
