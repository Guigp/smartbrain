const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  //formato específico para acessar o heroku
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

//root
app.get("/", (req, res) => {
  res.send("está funcionando!");
});

//login
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

//registro
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

//profile
app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

//rank
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

//api clarifai
app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app rodando na porta ${process.env.PORT}`);
});
