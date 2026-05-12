const fs = require("node:fs");
const path = require("node:path");
const express = require("express");
const cors = require("cors");

// Config

const CONTACTS_FILENAME = "contactList.json";

// Creamos una vari con el servidor
const server = express();

// SECCIÓN DE CONFIGURACIÓN DE SERVER

// Configuramos server para que funcione bien como API
server.use(cors());
server.use(express.json({ limit: "25Mb" }));

// Arrancamos el servidor en el puerto 4000
const port = 4000;
server.listen(port, () => {
  console.log(`Servidor iniciado <http://localhost:${port}>`);
});

// LOAD DATA

const contacts = {
  data: {
    results: [],
    info: {
      seed: "ffa1bdd62282eafe",
      results: 0,
      page: 1,
      version: "1.4",
    },
  },
  create: function (contact) {
    this.data.results.push(contact);
    this.data.info.results++;
  },
  read: function () {
    return this.data;
  },
  load: function () {
    const contactsFullFilename = path.join(
      path.dirname(__dirname),
      CONTACTS_FILENAME
    );

    const fileContents = fs.readFileSync(contactsFullFilename, {
      encoding: "utf-8",
    });

    const loadedContents = JSON.parse(fileContents);

    loadedContents.results.forEach((it) => this.create(it));
  },
};

contacts.load();

// SECCIÓN DE SERVIDOR DE APIS

server.get("/api/", (req, res) => {
  console.log(req.query);
  const savedContacts = contacts.read();
  const response = {
    results: [...savedContacts.results],
    info: { ...savedContacts.info },
  };

  if (req.query.country) {
    const country = req.query.country.toLocaleLowerCase();
    response.results = response.results.filter(
      (it) => it.location.country.toLocaleLowerCase() === country
    );
    response.info.results = response.results.length;
  }

  if (req.query.results && !isNaN(parseInt(req.query.results, 10))) {
    const numResults = parseInt(req.query.results, 10);
    response.results = response.results.slice(0, numResults);
    response.info.results = response.results.length;
  }

  res.json(response);
});
/*
server.post("/api/", (req, res) => {
  console.log(req.body);

  if (!req.body.name) {
    return res.json({ success: false, error: "The name field is expected." });
  }

  contacts.create(req.body);
  res.json({ success: true, data: req.body });
});
*/
