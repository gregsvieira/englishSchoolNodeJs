const express = require("express");
const people = require("./peopleRoute");
const levels = require("./levelsRoute");
const classes = require("./classesRoute");

module.exports = app => {
  app.use(express.json());
  app.use(people);
  app.use(levels);
  app.use(classes);

  app.get('/', (request,response)=> {
    response.json('status: on')
  });


}