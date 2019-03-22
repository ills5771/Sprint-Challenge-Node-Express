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

module.exports = router;
