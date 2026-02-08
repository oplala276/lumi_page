import Doctor from "../models/Doctor.js";

export const searchDoctors = async (req, res) => {
  const { q } = req.query;

  const doctors = await Doctor.find({
    name: { $regex: q, $options: "i" },
  });

  res.json(doctors);
};
