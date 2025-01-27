import { connection } from "../db/connection.js";

const specializationsController = {
  index(req, res) {
    const sqlIndex =
      "SELECT id, specialization, icon_tag FROM bdoctors.specializations;";

    console.log(req);

    connection.query(sqlIndex, (err, results) => {
      console.log(err);
      console.log(results);

      if (err)
        return res.status(500).json({ status: "KO", message: err.sqlMessage });

      return res.json(results);
    });
  },
};

export { specializationsController };
