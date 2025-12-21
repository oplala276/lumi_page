import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function PatientsTable() {
  const [patients, setPatients] = useState([]);

  const getData = async () => {
    const res = await fetch("http://localhost:5000/api/patient");
    const data = await res.json();
    setPatients(data.patients);
  };

  const deletePatient = async (id) => {
    await fetch(`http://localhost:5000/api/patient/${id}`, {
      method: "DELETE",
    });
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Patient ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Case Type</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {patients.map((p) => (
            <TableRow key={p._id}>
              <TableCell>{p.patientId}</TableCell>
              <TableCell>{p.fullName}</TableCell>
              <TableCell>{p.mobile}</TableCell>
              <TableCell>{p.caseType.join(", ")}</TableCell>
              <TableCell>
                <Button
                  size="small"
                  component={Link}
                  to={`/admin/patient/${p._id}`}
                >
                  View
                </Button>

                <Button
                  size="small"
                  color="error"
                  onClick={() => deletePatient(p._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
