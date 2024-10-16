import pool from "./database/config";
import app from "./app";
import { SwaggerDoc } from "./swagger/swagger";

(() => {
  pool
    .initialize()
    .then(() => console.log("Initialized pool ok!"))
    .catch(() => console.log("Error initialization pool!"));
  SwaggerDoc(app);
  app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`);
  });
})();
