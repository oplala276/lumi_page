import React, { useState } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
} from "@mui/material";

export default function PatientDetailForm() {
  const initialFormState = {
    patientId: "",
    registrationDate: null,
    fullName: "",
    age: "",
    photo: null,
    preview: null,
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
  const states = [
    "Andhra Pradesh",
    "Andaman and Nicobar Islands",
    " Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState(initialFormState);

  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setField("photo", file);
    setField("preview", URL.createObjectURL(file));
  };

  const validateField = (name, value) => {
    let message = "";

    switch (name) {
      case "fullName":
      case "city":
      case "referredName":
        if (!/^[a-zA-Z ]+$/.test(value))
          message = "Only alphabets are allowed(A-Z, a-z)";
        break;

      case "age":
        if (value < 1 || value > 100) message = "Age must be between 1 and 100";
        break;

      case "mobile":
      case "whatsapp":
      case "guardian":
      case "emergency":
        if (!/^[6-9]\d{9}$/.test(value))
          message = "Enter valid 10-digit number";
        break;

      case "email":
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          message = "Invalid email address";
        break;

      case "pincode":
        if (!/^\d{6}$/.test(value)) message = "Enter valid 6-digit pincode";
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  // Generic handler
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setForm((prev) => ({ ...prev, [name]: value }));
  // };

  const handleReset = () => {
    setForm(initialFormState);
  };

  const handleFile = (e) => {
    setForm((prev) => ({ ...prev, file: e.target.files[0] }));
  };
  const handleFileChange = (e) => {
  const file = e.target.files[0];
  setSelectedFile(file);
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

  const mandatoryCheck = () => {
    const missingFields = [];

    if (!form.registrationDate) missingFields.push("Registration Date");
    if (!form.fullName.trim()) missingFields.push("Full Name");
    if (!form.age) missingFields.push("Age");
    if (!form.gender) missingFields.push("Gender");

    if (!form.mobile) missingFields.push("Mobile Number");
    // if (!form.whatsapp) missingFields.push("WhatsApp Number");
    // if (!form.emergency) missingFields.push("Emergency Number");
    // if (!form.guardian) missingFields.push("Guardian Number");
    // if (!form.relationship) missingFields.push("Relationship");

    if (!form.address.city) missingFields.push("City/Village");
    if (!form.address.landmark) missingFields.push("Landmark");
    if (!form.address.state) missingFields.push("State");
    if (!form.address.pincode) missingFields.push("Pincode");

    if (!form.referredBy) missingFields.push("Referred By");
    if (!form.referredName) missingFields.push("Referred Name");

    if (form.hasEmail === "Yes" && !form.email) missingFields.push("Email");

    return missingFields;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const missingFields = mandatoryCheck();
    if (missingFields.length > 0) {
      alert("Please fill mandatory details:\n\n" + missingFields.join(", "));
      return;
    }
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (key === "address") {
        formData.append("address", JSON.stringify(form.address));
      } else if (key === "caseType") {
        form.caseType.forEach((c) => formData.append("caseType", c));
      }else if (key === "photo" && form.photo) {
  formData.append("photo", form.photo);
} else {
        formData.append(key, form[key]);
      }
    });
    // lumi-page-api.onrender.com
    try {
      const res = await fetch(
        "https://lumi-page-api.onrender.com/api/patient/add",
        // "http://localhost:5000/api/patient/add",
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await res.json();
      alert(data.message + "\nPlease note your patient Id");
      setForm(initialFormState);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box p={3}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 850, mx: "auto" }}>
        <Typography variant="h4" align="center" gutterBottom>
          PATIENT PERSONAL DETAIL FORM
        </Typography>

        {/* BASIC DETAILS */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          Basic Patient Details
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {/* Registration Date */}
            <Grid item xs={12} sm={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Registration*"
                  value={form.registrationDate}
                  onChange={(value) => setField("registrationDate", value)}
                  disableFuture
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
            </Grid>

            {/* Full Name */}
            <Grid item xs={12} sm={6} style={{ width: "40%" }}>
              <TextField
                label="Full Name*"
                name="fullName"
                fullWidth
                value={form.fullName}
                onChange={(e) => setField("fullName", e.target.value)}
                error={!!errors.fullName}
                helperText={errors.fullName}
              />
            </Grid>

            {/* Age */}
            <Grid item xs={12} sm={2}>
              <TextField
                label="Age*"
                type="number"
                name="age"
                inputProps={{ min: 1, max: 100 }}
                fullWidth
                value={form.age}
                onChange={(e) => setField("age", e.target.value)}
                error={!!errors.age}
                helperText={errors.age}
              />
            </Grid>
            <Grid> 
              <Typography fontWeight="bold">Upload Patient Photo</Typography>
              <input type="file" accept="image/*" onChange={handleImageChange} />

      {form.preview && (
        <img
          src={form.preview}
          alt="preview"
          width="150"
          style={{ marginTop: "10px" }}
        />
      )}</Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{ mt: 1 }}
            // style={{ marginTop: "50px" }}
          >
            {/* GENDER */}
            <Grid item xs={12} sm={6}>
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
          <Typography fontWeight="bold" sx={{ mt: 3 }}>
            Contact Details*
          </Typography>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            {/* Row 1 */}
            <Grid item xs={12} sm={4}>
              <TextField
                label="Mobile Number*"
                name="mobile"
                fullWidth
                value={form.mobile}
                onChange={(e) =>
                  setField("mobile", e.target.value.replace(/[^0-9]/g, ""))
                }
                inputProps={{ maxLength: 10 }}
                error={!!errors.mobile}
                helperText={errors.mobile}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="WhatsApp Number*"
                name="whatsapp"
                fullWidth
                value={form.whatsapp}
                onChange={(e) =>
                  setField("whatsapp", e.target.value.replace(/[^0-9]/g, ""))
                }
                inputProps={{ maxLength: 10 }}
                error={!!errors.whatsapp}
                helperText={errors.whatsapp}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="Emergency Number*"
                name="emergency"
                fullWidth
                value={form.emergency}
                onChange={(e) =>
                  setField("emergency", e.target.value.replace(/[^0-9]/g, ""))
                }
                inputProps={{ maxLength: 10 }}
                error={!!errors.emergency}
                helperText={errors.emergency}
              />
            </Grid>

            {/* Row 2 */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Guardian Number*"
                name="guardian"
                fullWidth
                value={form.guardian}
                onChange={(e) =>
                  setField("guardian", e.target.value.replace(/[^0-9]/g, ""))
                }
                inputProps={{ maxLength: 10 }}
                error={!!errors.guardian}
                helperText={errors.guardian}
              />
            </Grid>

            <Grid item xs={12} sm={6} style={{ width: "20%" }}>
              <TextField
                select
                label="Relationship*"
                name="relationship"
                fullWidth
                value={form.relationship}
                onChange={(e) => setField("relationship", e.target.value)}
              >
                {[
                  "Father",
                  "Mother",
                  "Brother",
                  "Sister",
                  "Daughter",
                  "Son",
                  "Friend",
                  "Neighbor",
                ].map((r) => (
                  <MenuItem key={r} value={r}>
                    {r}
                  </MenuItem>
                ))}
              </TextField>
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
              <TextField
                label="Email Address*"
                name="email"
                fullWidth
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
            )}
          </Grid>
          {/* ADDRESS */}
          <Typography fontWeight="bold" sx={{ mt: 3 }}>
            Address
          </Typography>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            {/* Row 1 */}
            <Grid item xs={12} sm={4} style={{ width: "30%" }}>
              <TextField
                label="Village/City*"
                name="city"
                fullWidth
                value={form.address.city}
                onChange={(e) =>
                  setField("address", {
                    ...form.address,
                    city: e.target.value,
                  })
                }
                error={!!errors.city}
                helperText={errors.city}
              />
            </Grid>

            <Grid item xs={12} sm={8} style={{ width: "65%" }}>
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

            {/* Row 2 */}
            <Grid item xs={12} sm={6} style={{ width: "30%" }}>
              <TextField
                select
                label="State*"
                fullWidth
                value={form.address.state}
                onChange={(e) =>
                  setField("address", {
                    ...form.address,
                    state: e.target.value,
                  })
                }
              >
                {states.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Pin Code*"
                name="pincode"
                fullWidth
                value={form.address.pincode}
                onChange={(e) =>
                  setField("address", {
                    ...form.address,
                    pincode: e.target.value.replace(/[^0-9]/g, ""),
                  })
                }
                inputProps={{ maxLength: 6 }}
                error={!!errors.pincode}
                helperText={errors.pincode}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Typography fontWeight="bold">Referral Details</Typography>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} style={{ width: "120px" }}>
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
                {["Doctor", "Volunteer", "Self", "Camp", "Other"].map(
                  (option) => (
                    <MenuItem defaultChecked key={option} value={option}>
                      {option}
                    </MenuItem>
                  ),
                )}
              </TextField>
            </Grid>

            {form.referredBy && (
              <Grid item xs={12}>
                <TextField
                  label={`${form.referredBy} Name*`}
                  name="referredName"
                  fullWidth
                  value={form.referredName}
                  onChange={(e) => setField("referredName", e.target.value)}
                  error={!!errors.referredName}
                  helperText={errors.referredName}
                />
              </Grid>
            )}

            <Grid
              container
              spacing={2}
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "-1%",
              }}
            >
              <Grid item xs={12} mt={2}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  type="submit"
                >
                  Submit Form
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                mt={2}
                display="flex"
                gap={2}
                marginBottom="3%"
              >
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
          </Grid>
          {/* MEDICAL REVIEW DETAILS */}
          {/* <Grid container spacing={2} sx={{ mt: 1 }}> */}
          {/* <Typography fontWeight="bold">Medical Review Details</Typography>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} style={{ width: "400px" }}>
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
            <Grid item xs={12} style={{ width: "400px" }}>
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
          {/*<Grid item xs={12}>
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
                Endocrinologist / Cardiologist / Physician / Dentist /
                Oncologist / Ophthalmologist / Physiotherapist
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
          </Grid> */}
          {/* 
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
          </Grid> */}
        </form>
      </Paper>
    </Box>
  );
}




//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const missingFields = mandatoryCheck();
// <<<<<<< HEAD
// =======

// >>>>>>> ca2da737e4fb105a49e8d0579017d85a4ec36f06
//     if (missingFields.length > 0) {
//       alert("Please fill mandatory details:\n\n" + missingFields.join(", "));
//       return;
//     }
// <<<<<<< HEAD
// =======
//     for (let key in errors) {
//       if (errors[key]) {
//         alert("Please fix validation errors before submitting");
//         return;
//       }
//     }

// >>>>>>> ca2da737e4fb105a49e8d0579017d85a4ec36f06
//     const formData = new FormData();
//     Object.keys(form).forEach((key) => {
//       if (key === "address") {
//         formData.append("address", JSON.stringify(form.address));
//       } else if (key === "caseType") {
//         form.caseType.forEach((c) => formData.append("caseType", c));
//       } else if (key === "file" && form.file) {
//         formData.append("file", form.file);
//       } else {
//         formData.append(key, form[key]);
//       }
//     });