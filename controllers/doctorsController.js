import { connection } from "../db/connection.js";

/**
 *
 * Ritorna Vero o Falso se l'Email è valida, ovvero se contiene esattamente una @ e un .
 *
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 *
 * Ritorna Vero o Falso se il Numero di Telefono è valida, ovvero se contiene esattamente 13 Caratteri di cui uno è il +, che deve essere primo nella stringa.
 *
 * @param {string} cellphone_number
 * @returns {boolean}
 */
function isValidCellphoneNumber(cellphone_number) {
  const cellphoneNumberRegex = /^\+?[0-9]+$/;
  if (cellphone_number.length > 13 || cellphone_number.length < 13)
    return false;
  return cellphoneNumberRegex.test(cellphone_number);
}

const doctorsController = {
  index(req, res) {
    const sqlIndex = `
    SELECT doctors.id, doctors.name, doctors.surname, doctors.avg_vote, doctors.image, specializations.specialization
    FROM doctors
    INNER JOIN specializations
    ON doctors.specialization_id = specializations.id;
    `;
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
       doctors.medical_specialization,
       doctors.avg_vote,
       doctors.image
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

    // # Cellphone Number is Valid
    if (!isValidCellphoneNumber(cellphone_number))
      return res
        .status(400)
        .json({ status: "KO", message: "Cellphone Number is Not Valid" });

    // # Email is Valid
    if (!isValidEmail(email))
      return res
        .status(400)
        .json({ status: "KO", message: "Email is Not Valid" });

    // # Email Arledy Exists in DB
    const sqlCheckEmail = `SELECT doctors.email FROM bdoctors.doctors WHERE doctors.email = ?;`;
    connection.query(sqlCheckEmail, [email], (err, results) => {
      if (err)
        return res.status(500).json({ status: "KO", message: err.sqlMessage });
      if (results.length)
        return res
          .status(400)
          .json({ status: "KO", message: "Email Arledy Exists" });

      const sqlStore =
        "INSERT INTO `bdoctors`.`doctors` (`name`, `surname`, `email`, `cellphone_number`, `address`, `medical_specialization`) VALUES (?, ?, ?, ?, ?, ?);";

      connection.query(
        sqlStore,
        [
          name,
          surname,
          email,
          cellphone_number,
          address,
          medical_specialization,
        ],
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
    });
  },

  update(req, res) {
    const {
      name,
      surname,
      email,
      cellphone_number,
      address,
      medical_specialization,
    } = req.body;
    const doctorId = parseInt(req.params.id);
    if (isNaN(doctorId) || doctorId < 1)
      return res
        .status(400)
        .json({ status: "KO", message: "Invalid Parameter" });

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

    // # Email is Valid
    if (!isValidEmail(email))
      return res
        .status(400)
        .json({ status: "KO", message: "Email is Not Valid" });

    // # Cellphone Number is Valid
    if (!isValidCellphoneNumber(cellphone_number))
      return res
        .status(400)
        .json({ status: "KO", message: "Cellphone Number is Not Valid" });

    // # Email Arledy Exists in DB
    const sqlCheckEmail = `SELECT doctors.email FROM bdoctors.doctors WHERE doctors.email = ?;`;
    connection.query(sqlCheckEmail, [email], (err, results) => {
      if (results.length)
        return res
          .status(400)
          .json({ status: "KO", message: "Email Arledy Exists" });
      const sqlUpdate =
        "UPDATE `bdoctors`.`doctors` SET `name` = ?, `surname` = ?, `email` = ?, `cellphone_number` = ?, `address` = ?, `medical_specialization` = ? WHERE (`id` = ?);";
      connection.query(
        sqlUpdate,
        [
          name,
          surname,
          email,
          cellphone_number,
          address,
          medical_specialization,
          doctorId,
        ],
        (err, results) => {
          if (err)
            return res
              .status(500)
              .json({ status: "KO", message: err.sqlMessage });

          if (!results.length)
            return res
              .status(404)
              .json({ status: "KO", message: "Doctor Not Found" });

          return res
            .status(200)
            .json({ status: "OK", message: "Replaced Succesfully" });
        }
      );
    });
  },

  modify(req, res) {
    const { ...allKeys } = req.body;
    const allEntries = Object.entries(allKeys);
    const allEntriesKey = [];
    const doctorId = parseInt(req.params.id);

    // # Data validation
    if (isNaN(doctorId) || doctorId < 1)
      return res
        .status(400)
        .json({ status: "KO", message: "Invalid Parameter" });

    // Funzione per verificare se l'email esiste già
    const checkEmailExistence = (email) => {
      return new Promise((resolve, reject) => {
        const sqlCheckEmail = `SELECT doctors.email FROM bdoctors.doctors WHERE doctors.email = ?;`;
        connection.query(sqlCheckEmail, [email], (err, results) => {
          if (err) return reject(err);
          if (results.length) return reject("Email Already Exists");
          resolve();
        });
      });
    };

    // Funzione di validazione
    const validateFields = async () => {
      for (const [key, value] of allEntries) {
        switch (key) {
          case "name":
          case "surname":
            if (value.length < 3)
              return res
                .status(400)
                .json({ status: "KO", message: "Name or Surname Too Short" });
            break;
          case "address":
            if (value.length < 5)
              return res
                .status(400)
                .json({ status: "KO", message: "Address Too Short" });
            break;
          case "email":
            if (!isValidEmail(value))
              return res
                .status(400)
                .json({ status: "KO", message: "Email is Not Valid" });
            try {
              await checkEmailExistence(value);
            } catch (err) {
              return res.status(400).json({ status: "KO", message: err });
            }
            break;
          case "cellphone_number":
            if (!isValidCellphoneNumber(value))
              return res.status(400).json({
                status: "KO",
                message: "Cellphone Number is Not Valid",
              });
            break;
        }
      }
      return null;
    };

    // Esegui la validazione
    validateFields().then((error) => {
      if (error) return;
      let sqlModify = "UPDATE bdoctors.doctors SET ";
      allEntries.forEach((el, index) => {
        if (el[0] && allEntries.length - 1 !== index)
          sqlModify += `${el[0]} = ?, `;
        if (allEntries.length - 1 === index) sqlModify += `${el[0]} = ? `;
        allEntriesKey.push(el[1]);
      });
      sqlModify += "WHERE (id = ?);";

      connection.query(
        sqlModify,
        [...allEntriesKey, doctorId],
        (err, results) => {
          if (err)
            return res
              .status(500)
              .json({ status: "KO", message: err.sqlMessage });
          if (!results.affectedRows)
            return res
              .status(404)
              .json({ status: "KO", message: "Doctor Not Found" });

          return res
            .status(200)
            .json({ status: "OK", message: "Modified Successfully" });
        }
      );
    });
  },

  destroy(req, res) {
    const doctorId = parseInt(req.params.id);
    if (isNaN(doctorId) || doctorId < 1)
      return res
        .status(400)
        .json({ status: "KO", message: "Invalid Parameter" });

    const sqlDestroy = "DELETE FROM `bdoctors`.`doctors` WHERE (`id` = ?);";
    connection.query(sqlDestroy, [doctorId], (err, results) => {
      if (err)
        return res.status(500).json({ status: "KO", message: err.sqlMessage });
      console.log(results);

      if (!results.affectedRows)
        return res
          .status(404)
          .json({ status: "KO", message: "Doctor Not Found" });
      return res
        .status(200)
        .json({ status: "OK", message: "Deleted Succesfully" });
    });
  },
};

export { doctorsController };
