import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Radio,
  RadioGroup,
  MenuItem,
  // TextareaAutosize,
} from "@mui/material";

export default function PatientDetailForm() {

  
  const initialFormState = {
  patientId: "",
  registrationDate: "",
  fullName: "",
  age: "",
  gender: "",
  mobile: "",
  whatsapp: "",
  guardian: "",
  emergency: "",
  hasEmail: "No",
  email: "",
  referredBy: "Referred Name",
  referredName: "",
  address: {
    city: "",
    landmark: "",
    state: "",
    pincode: "",
  },
  complaint: "",
  duration: "",
  observations: "",
  reviewedBy: "",
  reviewDate: "",
  diagnosis: "",
  caseType: [],
  doctorRequired: "",
  currentTreatment: "",
  file: null,
};

const [form, setForm] = useState(initialFormState);

  // const [form, setForm] = useState({
  //   patientId: "",
  //   registrationDate: "",
  //   fullName: "",
  //   age: "",
  //   gender: "",
  //   mobile: "",
  //   whatsapp: "",
  //   guardian: "",
  //   emergency: "",
  //   hasEmail: "No", 
  //   email: "",
  //   relationship: "",
  //   address: {
  //     city: "",
  //     landmark: "",
  //     state: "",
  //     pincode: "",
  //   },
  //   referredBy: "Referred Name",
  //   referredName: "",
  //   complaint: "",
  //   duration: "",
  //   observations: "",
  //   reviewedBy: "",
  //   reviewDate: "",
  //   diagnosis: "",
  //   caseType: [],
  //   doctorRequired: "",
  //   expertise: "",
  //   currentTreatment: "",
  //   file: null,
  // });

  // Generic handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
  setForm(initialFormState);
};

  const handleFile = (e) => {
    setForm((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const toggleCaseType = (type) => {
    setForm((prev) => {
      const exists = prev.caseType.includes(type);
      return {
        ...prev,
        caseType: exists
          ? prev.caseType.filter((t) => t !== type)
          : [...prev.caseType, type],
      };
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  for (let key in form) {
    if (key === "address") {
      formData.append("city", form.address.city);
      formData.append("landmark", form.address.landmark);
      formData.append("state", form.address.state);
      formData.append("pincode", form.address.pincode);
    } else if (key === "caseType") {
      form.caseType.forEach((item) => formData.append("caseType", item));
    } else if (key === "file" && form.file) {
      formData.append("file", form.file);
    } else {
      formData.append(key, form[key]);
    }
  }

  try {
    const res = await fetch("https://lumi-page-api.onrender.com/api/patient/add", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    alert(data.message + "\nPlease note your patient Id");
    // console.log("Response:", data);
    setForm(initialFormState);
} catch (error) {
  console.log(error);
}
};

  return (
    <Box p={3}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 900, mx: "auto" }}>
        <Typography variant="h4" align="center" gutterBottom>
          PATIENT PERSONAL DETAIL FORM
        </Typography>

        {/* BASIC DETAILS */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          Basic Patient Details
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
{/* 
            <Grid item xs={12} sm={6}>
              <TextField
                label="Patient ID*"
                name="patientId"
                fullWidth
                value={form.patientId}
                onChange={handleChange}
              />
            </Grid> */}

            <Grid item xs={12} sm={6}>
              <TextField
                label="Date of Registration*"
                name="registrationDate"
                placeholder="DD/MM/YYYY"
                fullWidth
                value={form.registrationDate}
                onChange={handleChange}
              />
            </Grid>
            </Grid>
          <Grid container spacing={2} sx={{ mt: 1 }}>

            <Grid item xs={12} sm={2}>
              <TextField
                label="Full Name*"
                name="fullName"
                fullWidth
                value={form.fullName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <TextField
                label="Age*"
                type="number"
                name="age"
                fullWidth
                value={form.age}
                onChange={handleChange}
              />
            </Grid>
            </Grid>
          <Grid container spacing={2}>
            {/* GENDER */}
            <Grid item xs={12}>
              <Typography fontWeight="bold">Gender*</Typography>
              <Box>
                {["Male", "Female", "Transgender"].map((g) => (
                  <FormControlLabel
                    key={g}
                    control={
                      <Checkbox
                        checked={form.gender === g}
                        onChange={() => setForm((p) => ({ ...p, gender: g }))}
                      />
                    }
                    label={g}
                  />
                ))}
              </Box>
            </Grid>
            </Grid>
              <Typography fontWeight="bold">Contact Details*</Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Mobile Number*"
                name="mobile"
                fullWidth
                value={form.mobile}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="WhatsApp Number*"
                name="whatsapp"
                fullWidth
                value={form.whatsapp}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Guardian Number*"
                name="guardian"
                fullWidth
                value={form.guardian}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Emergency Number*"
                name="emergency"
                fullWidth
                value={form.emergency}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Type of Relationship*"
                name="relationship"
                fullWidth
                value={form.relationship}
                onChange={handleChange}
              />
            </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 1 }}>                  
            <Grid item xs={12}>
              <Typography fontWeight="bold">
                Do you have an Email Address?
              </Typography>

              <RadioGroup
                row
                value={form.hasEmail}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    hasEmail: e.target.value,
                    email: e.target.value === "No" ? "" : prev.email,
                  }))
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </Grid>
            {form.hasEmail === "Yes" && (
              <Grid item xs={12} style={{ marginTop: '16px' }}>
                <TextField
                  label="Email Address*"
                  name="email"
                  type="email"
                  fullWidth
                  value={form.email}
                  onChange={handleChange}
                />
              </Grid>
            )}

            {/* <Grid item xs={12}>
              <TextField
                label="Email Address*"
                name="email"
                type="email"
                fullWidth
                value={form.email}
                onChange={handleChange}
              />
            </Grid> */}
            </Grid>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Typography fontWeight="bold">Address</Typography>
            </Grid>
            <Grid container spacing={2}>
            {/* ADDRESS */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Village/City*"
                fullWidth
                value={form.address.city}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    address: { ...p.address, city: e.target.value },
                  }))
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Landmark*"
                fullWidth
                value={form.address.landmark}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    address: { ...p.address, landmark: e.target.value },
                  }))
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="State*"
                fullWidth
                value={form.address.state}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    address: { ...p.address, state: e.target.value },
                  }))
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Pin Code*"
                fullWidth
                value={form.address.pincode}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    address: { ...p.address, pincode: e.target.value },
                  }))
                }
              />
            </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Typography fontWeight="bold">Referral Details</Typography>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} style={{width:'120px'}}>
              <TextField
                select
                label="Referred By*"
                name="referredBy"
                fullWidth
                value={form.referredBy}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    referredBy: e.target.value,
                    referredName: "", // reset on change
                  }))
                }
              >
                {["Doctor", "Volunteer", "Self", "Camp", "Other"].map((option) => (
                  <MenuItem defaultChecked key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {form.referredBy && (
              <Grid item xs={12}>
                <TextField
                  label={`${form.referredBy} Name*`}
                  name="referredName"
                  fullWidth
                  value={form.referredName}
                  onChange={handleChange}
                />
              </Grid>
            )}
            </Grid>
            {/* MEDICAL REVIEW DETAILS */}
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Typography fontWeight="bold">Medical Review Details</Typography>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 1 }}>
            {/* <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 3 }}>
                MEDICAL REVIEW DETAILS
              </Typography>
            </Grid> */}

            <Grid item xs={12} style={{width:'400px'}}>
              <TextField
                label="Primary Complaint / Problem*"
                name="complaint"
                fullWidth
                multiline
                rows={3}
                value={form.complaint}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Duration of Problem*"
                name="duration"
                fullWidth
                value={form.duration}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Preliminary Diagnosis*"
                name="diagnosis"
                fullWidth
                multiline
                rows={3}
                value={form.diagnosis}
                onChange={handleChange}
              />
            </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 1 }}>

            <Grid item xs={12} style={{width:'400px'}}>
              <TextField
                label="Observations (Initials)*"
                name="observations"
                fullWidth
                multiline
                rows={3}
                value={form.observations}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Reviewed By*"
                name="reviewedBy"
                fullWidth
                value={form.reviewedBy}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Review Date*"
                name="reviewDate"
                placeholder="DD/MM/YYYY"
                fullWidth
                value={form.reviewDate}
                onChange={handleChange}
              />
            </Grid>

            {/* CASE TYPE */}
            <Grid item xs={12}>
              <Typography fontWeight="bold">Type of Case</Typography>
              <Box>
                {["General", "Surgical", "Emergency", "Follow-up"].map((c) => (
                  <FormControlLabel
                    key={c}
                    control={
                      <Checkbox
                        checked={form.caseType.includes(c)}
                        onChange={() => toggleCaseType(c)}
                      />
                    }
                    label={c}
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Type of Doctor Required"
                name="doctorRequired"
                fullWidth
                multiline
                rows={2}
                value={form.doctorRequired}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography fontWeight="bold">
                Expertise Required for First Treatment
              </Typography>
              <Typography variant="body2">
                Endocrinologist / Cardiologist / Physician / Dentist / Oncologist /
                Ophthalmologist / Physiotherapist
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Current Treatment / Ongoing Medication or Therapy"
                name="currentTreatment"
                fullWidth
                multiline
                rows={3}
                value={form.currentTreatment}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography fontWeight="bold">
                Attach Previous Tests / Prescription
              </Typography>
              <input type="file" onChange={handleFile} />
            </Grid>
            </Grid>

            <Grid container spacing={2} style={{display:'flex', justifyContent:'center'}}>
            <Grid item xs={12} mt={2}>
              <Button variant="contained" fullWidth size="large" type="submit">
                Submit Form
              </Button>
            </Grid>
            <Grid item xs={12} mt={2} display="flex" gap={2}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={handleReset}
            >
              Reset
            </Button>
          </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}