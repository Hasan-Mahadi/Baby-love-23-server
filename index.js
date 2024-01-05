const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

const categories = require('./data/categories.json');
const products = require('./data/products.json');

app.use(cors());


console.log(process.env.DB_PASS)
console.log(process.env.DB_USER)

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster-0.djotxke.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        await client.connect();

        

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

        await client.close();
    }
}
run().catch(console.log);







app.get('/', (req, res) => {
    res.send('baby love is running')
});


app.get('/categories', (req, res) => {
    res.send(categories);
})


app.get('/products', (req, res) => {
    res.send(products);
});



app.get('/products/:id', (req, res) => {
    const id = req.params.id;

    const selectedproducts = products.find(n => n._id === id);
    res.send(selectedproducts);
});


app.get('/categories/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (id === 0) {
        res.send(products)
    }
    else {
        const categoriesprodct = products.filter(n => parseInt(n.category_id) === id);
        res.send(categoriesprodct);
    }

})




app.listen(port, () => {
    console.log(`Baby is love running port: ${port}`)
})