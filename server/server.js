const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;
const allowedOrigins = ["http://localhost:5173"];

app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});