import Appointment from "../models/Appointment.js";
import { generateAppointmentId } from "../utils/generateAppointmentId.js";

export async function createAppointment(req, res) {
  try {
    const data = { ...req.body };
    
    const appointmentId = generateAppointmentId();
    const appointment = await Appointment.create({ ...data, appointmentId });
    res.status(201).json({
      success: true,
      message: `Please note down appointment ID: ${appointmentId}`,
      appointment,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getPatientAppointments = async (req, res) => {
  try {
    const list = await Appointment.find({ patientId: req.params.id });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find(); 
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};