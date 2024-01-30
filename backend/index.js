const cors = require("cors");
const express = require("express");
const mainRouter = require("./routes/index");
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use("/notesapp", mainRouter);

app.listen(port);
