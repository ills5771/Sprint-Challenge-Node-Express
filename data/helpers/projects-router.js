const express = require("express");

const Projects = require("./projectModel");

const router = express.Router();

router.get("/", async (req, res) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json({ message: "Projects could not be retrieved" });
    });
});

module.exports = router;
