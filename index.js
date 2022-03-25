const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const express = require('express')
const app = express()
var cors = require('cors')
const port = process.env.PORT || 5000;
// require('dotenv').config();
app.use(cors());
app.use(express.json());
const uri = "mongodb+srv://pagination:yL1qjNUddkzu8Ana@cluster0.w5uf7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
      const database = client.db("pagination");
      const productsCollection = database.collection('products');

      app.get('/products', async (req, res) => {
        // const query = {};
        console.log(req.query);
        const cursor = productsCollection.find({});
        const page =req.query.page;
        const size = parseInt(req.query.size);
        let products;
        // products = await cursor.toArray();
        const count = await cursor.count();
        // const count = await len(list(tut));
        
        if (page) {
          products = await cursor.skip(page * size).limit(size).toArray();
        }
        else {
          products = await cursor.toArray();
        }
        res.send({
          count,
           products
        });
      })
        
    }
    finally {
        // await client.close();
      }
    }
    
    run().catch(console.dir);
    
    app.get('/', (req, res) => {
        res.send('Hello World!hurrah')
      })
      
      app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
      })
