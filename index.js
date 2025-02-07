const express = require("express");
const app = express();
const { userRouter } = require("./routes/userRoute");
const { prodRouter } = require("./routes/prodRoute");
const { Connect } = require("./config/db");
const auth = require("./middleware/auth");

require("dotenv").config();
app.use(express.json());

app.use("/user", userRouter);
app.use(auth);
app.use("/product", prodRouter);

app.listen(process.env.Port, async () => {
  await Connect();
  console.log("Connected to database");
  console.log(`Server is running on port ${process.env.Port}`);
});
