import { connection } from "../db/connection.js";

const doctorsController = {
  index(req, res) {
    res.send("Index");
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
