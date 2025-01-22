import { connection } from "../db/connection.js";

const doctorsController = {
  index(req, res) {
    const sqlIndex = `SELECT doctors.id, doctors.name, doctors.surname, doctors.medical_specialization FROM doctors;`;
    connection.query(sqlIndex, (err, results) => {
      if (err) res.status(500).json({ status: "KO", message: err.sqlMessage });
      res.json(results);
    });
  },
  show(req, res) {
    const doctorId = parseInt(req.params.id);
    if (isNaN(doctorId) || doctorId < 1)
      return res
        .status(400)
        .json({ status: "KO", message: "Invalid Parameter" });
    const sqlShowDoctors = `SELECT doctors.id, 
       doctors.name, 
       doctors.surname, 
       doctors.email, 
       doctors.cellphone_number, 
       doctors.address, 
       doctors.medical_specialization
       FROM doctors
       WHERE doctors.id = ?;
       `;

    const sqlShowReviews = `
      SELECT reviews.id,
        reviews.name,
        reviews.vote,
        reviews.text,
        reviews.created_at,
        reviews.updated_at
      FROM reviews
      INNER JOIN doctors 
      ON doctors.id = reviews.doctor_id
      WHERE doctors.id = ?;
    `;

    connection.query(sqlShowDoctors, [doctorId], (err, results) => {
      if (err)
        return res.status(500).json({ status: "KO", message: err.sqlMessage });
      if (!results.length)
        return res
          .status(404)
          .json({ status: "KO", message: "Doctor Not Found" });

      const doctor = results[0];

      connection.query(sqlShowReviews, [doctorId], (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ status: "KO", message: err.sqlMessage });
        if (!results.length)
          return res
            .status(404)
            .json({ status: "KO", message: "Reviews Not Found" });
        doctor.reviews = results;
        res.json(doctor);
      });
    });
  },
  store(req, res) {
    res.send("store");
  },
  update(req, res) {
    res.send("update");
  },
  modify(req, res) {
    res.send("modify");
  },
  destroy(req, res) {
    res.send("destroy");
  },
};

export { doctorsController };
