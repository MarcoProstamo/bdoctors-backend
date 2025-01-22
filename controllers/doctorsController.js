import { connection } from "../db/connection.js";

const doctorsController = {
  index(req, res) {
    const sqlIndex = `SELECT doctors.id, doctors.name, doctors.surname, doctors.medical_specialization FROM doctors;`;
    connection.query(sqlIndex, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  },
  show(req, res) {
    res.send("show");
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
