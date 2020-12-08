require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
const prodCtrl = require("./products_controller");

const { SERVER_PORT, CONNECTION_STRING } = process.env;

app.use(express.json());

app.get("/api/products", prodCtrl.getAll);
app.get("/api/products/:product_id", prodCtrl.getOne);
app.put("/api/products/:product_id", prodCtrl.update);
app.post("/api/products", prodCtrl.create);
app.delete("/api/products/:product_id", prodCtrl.delete);

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
})
  .then((dbInstance) => {
    console.log("DB Ready");
    app.set("db", dbInstance);
    app.listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
