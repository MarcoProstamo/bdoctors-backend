import { connection } from "../db/connection.js";

const doctorsController = {
  index(req, res) {
    const sqlIndex = `SELECT doctors.id, doctors.name, doctors.surname, doctors.medical_specialization FROM doctors;`;
    connection.query(sqlIndex, (err, results) => {
      if (err)
        return res.status(500).json({ status: "KO", message: err.sqlMessage });
      return res.json(results);
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
        return res.json(doctor);
      });
    });
  },
  store(req, res) {
    const {
      name,
      surname,
      email,
      cellphone_number,
      address,
      medical_specialization,
    } = req.body;

    // # Input Empty
    if (
      !name ||
      !surname ||
      !email ||
      !cellphone_number ||
      !address ||
      !medical_specialization
    )
      return res
        .status(400)
        .json({ status: "KO", message: "Input Cannot be Empty" });

    // # Name or Surname 3 or less characters
    if (name.length < 3 || surname.length < 3)
      return res
        .status(400)
        .json({ status: "KO", message: "Name or Surname Too Short" });

    // # Address 5 or less characters
    if (address.length < 5)
      return res
        .status(400)
        .json({ status: "KO", message: "Address Too Short" });

    // # Email Arledy Exists in DB
    const sqlCheckEmail = `SELECT doctors.email FROM bdoctors.doctors WHERE doctors.email = ?;`;
    connection.query(sqlCheckEmail, [email], (err, results) => {
      if (results.length)
        return res
          .status(400)
          .json({ status: "KO", message: "Email Arledy Exists" });
    });

    // # Email is Valid
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    if (!isValidEmail(email))
      return res
        .status(400)
        .json({ status: "KO", message: "Email is Not Valid" });

    // # Cellphone Number is Valid
    function isValidCellphoneNumber(cellphone_number) {
      const cellphoneNumberRegex = /^\+?[0-9]+$/;
      if (cellphone_number.length > 13 || cellphone_number.length < 13)
        return false;
      return cellphoneNumberRegex.test(cellphone_number);
    }

    if (!isValidCellphoneNumber(cellphone_number))
      return res
        .status(400)
        .json({ status: "KO", message: "Cellphone Number is Not Valid" });

    const sqlStore =
      "INSERT INTO `bdoctors`.`doctors` (`name`, `surname`, `email`, `cellphone_number`, `address`, `medical_specialization`) VALUES (?, ?, ?, ?, ?, ?);";

    connection.query(
      sqlStore,
      [name, surname, email, cellphone_number, address, medical_specialization],
      (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ status: "KO", message: err.sqlMessage });

        return res
          .status(201)
          .json({ status: "OK", message: "Created Succesfully" });
      }
    );
  },

  // # BONUS --------
  update(req, res) {
    res.send("update");
  },
  modify(req, res) {
    res.send("modify");
  },
  // # BONUS --------

  destroy(req, res) {
    const doctorId = parseInt(req.params.id);
    const sqlDestroy = "DELETE FROM `bdoctors`.`doctors` WHERE (`id` = ?);";
    connection.query(sqlDestroy, [doctorId], (err, results) => {
      if (err)
        return res.status(500).json({ status: "KO", message: err.sqlMessage });
      return res
        .status(200)
        .json({ status: "OK", message: "Deleted Succesfully" });
    });
  },
};

export { doctorsController };
