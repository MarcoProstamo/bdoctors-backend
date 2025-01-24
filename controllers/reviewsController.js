import { connection } from "../db/connection.js";

const reviewsController = {
  store(req, res) {
    let { doctor_id, name, text, vote } = req.body;

    // # Input Empty
    if (!doctor_id || !name || !vote)
      return res.status(400).json({
        status: "KO",
        message: "DoctorID, Name or Vote Cannot be Empty",
      });

    // # Name or Surname 3 or less characters
    if (name.length < 3)
      return res.status(400).json({ status: "KO", message: "Name Too Short" });

    // # Vote is a Number
    if (isNaN(vote))
      return res
        .status(400)
        .json({ status: "KO", message: "Vote is Not a Number" });

    // # DoctorID is a Number
    if (isNaN(doctor_id))
      return res
        .status(400)
        .json({ status: "KO", message: "DoctorID is Not a Number" });

    // # Vote Between 1-5
    if (vote < 1 || vote > 5)
      return res
        .status(400)
        .json({ status: "KO", message: "Vote Must be Between 1 and 5" });

    const sqlCheckDoctorID = `SELECT doctors.id FROM bdoctors.doctors WHERE doctors.id = ?;`;
    connection.query(sqlCheckDoctorID, [doctor_id], (err, results) => {
      if (err)
        return res.status(500).json({ status: "KO", message: err.sqlMessage });
      if (!results.length)
        return res
          .status(400)
          .json({ status: "KO", message: "Doctor Not Found" });

      const sqlStore =
        "INSERT INTO `bdoctors`.`reviews` (`doctor_id`, `name`, `vote`, `text`) VALUES (?, ?, ?, ?);";
      connection.query(
        sqlStore,
        [doctor_id, name, vote, text],
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
};

export { reviewsController };
