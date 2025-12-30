// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableHead,
//   TableRow,
//   TableBody,
//   TableCell,
//   Paper,
//   Button,
// } from "@mui/material";
// import { Link } from "react-router-dom";

// export default function PatientsTable() {
//   const [patients, setPatients] = useState([]);

//   const getData = async () => {
//     const res = await fetch("https://lumi-page-api.onrender.com/api/patient");
//     const data = await res.json();
//     setPatients(data.patients);
//   };

//   const deletePatient = async (id) => {
//     console.log("Deleting patient with id:", id);
//     await fetch(`http://localhost:5000/api/patient/${id}`, {
//       method: "DELETE",
//     });
//     getData();
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <Paper sx={{ p: 2 }}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Patient ID</TableCell>
//             <TableCell>Name</TableCell>
//             <TableCell>Mobile</TableCell>
//             <TableCell>Case Type</TableCell>
//             <TableCell>Action</TableCell>
//           </TableRow>
//         </TableHead>

//         <TableBody>
//           {patients.map((p) => (
//             <TableRow key={p._id}>
//               <TableCell>{p.patientId}</TableCell>
//               <TableCell>{p.fullName}</TableCell>
//               <TableCell>{p.mobile}</TableCell>
//               <TableCell>{p.caseType.join(", ")}</TableCell>
//               <TableCell>
//                 <Button
//                   size="small"
//                   component={Link}
//                   to={`/admin/patient/${p._id}`}
//                 >
//                   View
//                 </Button>

//                 <Button
//                   size="small"
//                   color="error"
//                   onClick={() => deletePatient(p._id)}
//                 >
//                   Delete
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Paper>
//   );
// }


import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  Button,
  TextField,
  Box,
  Avatar,
  Typography
} from "@mui/material";
import { Link } from "react-router-dom";

export default function PatientsTable() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");

  const getData = async () => {
    const res = await fetch("https://lumi-page-api.onrender.com/api/patient");
    const data = await res.json();
    setPatients(data.patients);
  };

  const deletePatient = async (id) => {
    await fetch(`https://lumi-page-api.onrender.com/api/patient/${id}`, {
      method: "DELETE",
    });
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  // Search filter (Name + Mobile + PatientId)
  const filteredPatients = patients.filter((p) =>
    (p.fullName + p.mobile + p.patientId)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Paper sx={{ p: 3 }}>
      {/* Top Header Search Bar */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <TextField
          size="small"
          placeholder="Search a patient (Enter name or mobile)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 350 }}
        />
      </Box>

      {/* Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Patient ID</b></TableCell>
            <TableCell><b>Thumb Impression</b></TableCell>
            <TableCell><b>Patient Full Name</b></TableCell>
            <TableCell><b>Sex, Age & Location</b></TableCell>
            <TableCell><b>Contact Mobile Number</b></TableCell>
            <TableCell><b>Referral Name</b></TableCell>
            <TableCell><b>Action</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredPatients.map((p) => (
            <TableRow key={p._id}>
              
              <TableCell>{p.patientId}</TableCell>

              {/* Thumb Placeholder */}
              <TableCell>
                <Avatar
                  sx={{
                    bgcolor: "#d0d0d0",
                    width: 48,
                    height: 48,
                  }}
                >
                  
                </Avatar>
              </TableCell>

              <TableCell>
                <Typography fontWeight="bold">{p.fullName}</Typography>
              </TableCell>

              {/* Sex + Age + Location */}
              <TableCell>
                {p.gender}, {p.age}
                <br />
                {p.address && `(${p.address})`}
              </TableCell>

              <TableCell>{p.mobile}</TableCell>

              <TableCell>{p.referredBy || "—"}</TableCell>

              {/* Action Buttons */}
              <TableCell>

                <Button
                  size="small"
                  variant="outlined"
                  component={Link}
                  to={`/admin/patient/${p._id}`}
                  sx={{ mr: 1 }}
                >
                  VIEW DETAILS
                </Button>

                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  component={Link}
                  to={`/admin/patient/edit/${p._id}`}
                  sx={{ mr: 1 }}
                >
                  EDIT & SAVE
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
