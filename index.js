const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const authRoutes = require("./Routes/auth");
const listingRoutes = require("./Routes/listing");

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

//Routes
app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);

const PORT = process.env.PORT || 5000;
//Mongoose setup
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "Dream_Nest",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(`${err}`));
