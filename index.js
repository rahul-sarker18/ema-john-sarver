const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { query } = require("express");
require("dotenv").config();

//midelwair

app.use(cors());
app.use(express.json());

//

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.dyhfshi.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const productsmath = client.db("ema-john-sarver").collection("products");
    // product get db
    app.get("/products", async (req, res) => {
      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);
      console.log(page, size);
      const query = {};
      const curture = productsmath.find(query);
      const products = await curture
        .skip(page * size)
        .limit(size)
        .toArray();
      const count = await productsmath.estimatedDocumentCount();

      res.send({ count, products });
    });

    //
    app.post("/productsIds", async (req, res) => {
      const ids = req.body;
      const objectids = ids.map((id) => ObjectId(id));
      const query = { _id: { $in: objectids } };
      const curture = productsmath.find(query);
      const products = await curture.toArray();
      res.send(products);
    });
  } finally {
  }
}
run().catch(console.dir);




app.get('/' , (req , res)=>{
    res.send('ema-johon simple is run')
});

app.listen(port , ()=>{
    console.log(`ema-john-simple is run ${port}`);
})