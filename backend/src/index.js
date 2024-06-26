import dotenv from "dotenv";

import { app } from "./utils/app.js";
import connectDB from "./utils/db.js";

dotenv.config({ path: "./env" });

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`MONGODB connection failed!`, error);
  });
