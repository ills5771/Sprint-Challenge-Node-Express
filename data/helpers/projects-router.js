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

router.get("/:id", async (req, res) => {
  try {
    const project = await Projects.get(req.params.id);
    if (project) {
      res.status(200).json(project);
    } else {
      res
        .status(404)
        .json({ message: "The project with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ message: "The project could not be retrieved." });
  }
});

router.post("/", (req, res) => {
  const project = req.body;
  if (project.name && project.description) {
    Projects.insert(project)
      .then(project => {
        res.status(201).json(project);
      })
      .catch(error => {
        res.status(500).json({
          message: "There was an error saving the project to the database"
        });
      });
  } else {
    res.status(400).json({
      message: "Please provide name and description for the project."
    });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  if (changes.name && changes.description) {
    Projects.update(id, changes)

      .then(updated => {
        if (updated) {
          res.status(200).json(updated);
        } else {
          res.status(404).json({
            message: "The project with the specified ID does not exist."
          });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "The project could not be updated." });
      });
  } else {
    res.status(400).json({
      message: "Please provide name and description for the project."
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const project = await Projects.remove(req.params.id);
    if (project > 0) {
      res.status(204).end();
    } else {
      res
        .status(404)
        .json({ message: "The project with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ message: "The project could not be removed" });
  }
});

module.exports = router;
