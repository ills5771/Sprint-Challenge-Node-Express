const express = require("express");

const Actions = require("./actionModel");

const router = express.Router();

router.get("/", async (req, res) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      res.status(500).json({ message: "Actions could not be retrieved" });
    });
});

router.get("/:id", async (req, res) => {
  try {
    const action = await Actions.get(req.params.id);
    if (action) {
      res.status(200).json(action);
    } else {
      res
        .status(404)
        .json({ message: "The action with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ message: "The action could not be retrieved." });
  }
});
router.post("/", (req, res) => {
  const action = req.body;
  if (action.notes && action.description) {
    Actions.insert(action)
      .then(action => {
        res.status(201).json(action);
      })
      .catch(error => {
        res.status(500).json({
          message: "There was an error saving the action to the database"
        });
      });
  } else {
    res.status(400).json({
      message: "Please provide notes and description for the action."
    });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  if (changes.notes && changes.description) {
    Actions.update(id, changes)

      .then(updated => {
        if (updated) {
          res.status(200).json(updated);
        } else {
          res.status(404).json({
            message: "The action with the specified ID does not exist."
          });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "The action could not be updated." });
      });
  } else {
    res.status(400).json({
      message: "Please provide notes and description for the action."
    });
  }
});

module.exports = router;
