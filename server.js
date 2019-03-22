const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const projectsRouter = require("./data/helpers/projects-router");

const actionsRouter = require("./data/helpers/actions-router");
const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/projects", projectsRouter);
server.use("/actions", actionsRouter);

server.get("/", (req, res) => {
  res.send(`
   Sprint WebApi Challenge
    `);
});

module.exports = server;
