const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken"); // 👈 زيدها فوق

const app = express();

app.use(cors());
app.use(express.json());

const SECRET_KEY = "mysecretkey";

const users = [
  { name: "mariam", password: "1234" },
  { name: "ahmed", password: "5678" },
  { name: "test", password: "0000" },
  { name: "teste", password: "0001" }

];

app.post("/api/login", (req, res) => {
  const { name, password } = req.body;

  const foundUser = users.find(
    (u) => u.name === name && u.password === password
  );

  if (foundUser) {
    const token = jwt.sign(
      { name: foundUser.name },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.json({
      response: true,
      token: token
    });
  }

  return res.json({ response: false });
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});