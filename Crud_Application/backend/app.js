const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config/config");
var schema = require("./graphql/schema");

const { graphqlHTTP } = require("express-graphql");
const app = express();

app.use(bodyParser.json());
app.use(cors());
const dbConfig = require("./config/config.js");

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema, 
    rootValue: global, 
    graphiql: true,
  })
);

mongoose
  .connect(dbConfig.url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(3000, console.log("connected to port 3000."));
  })
  .catch((err) => console.log(err));
