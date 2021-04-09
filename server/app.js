const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require('cors')
// const mongoose = require("mongoose");

const app = express();
app.use(cors())
const schema = require("./schema/schema");

// mongoose.connect(uri)
// mongoose.connection.once('open',()=>{
//     console.log('conncetion done')
// })

// const res = saveDB({ name: "Masashi Kishimoto", id: "1" });
// console.log(res)
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log("app running on server http://localhost:4000/graphql");
});
