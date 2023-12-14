const express = require("express");
const mongoose = require("mongoose");
const routes = require("./api/routes/studentRoutes");
const { errHandler } = require("./api/middleware/errHandler");
const hostname = "127.0.0.1";
const port = 3000;
const app = express();

mongoose.connect("mongodb://localhost:27017/studentsDB");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use(routes);
app.use(errHandler);

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for JSONPlaceholder",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. It retrieves data from JSONPlaceholder.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "JSONPlaceholder",
      url: "https://jsonplaceholder.typicode.com",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./api/routes/studentRoutes.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, hostname, () => {
  console.log(`Server running http://locahost:${port}`);
});
