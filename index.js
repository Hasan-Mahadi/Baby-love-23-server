const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

const categories = require('./data/categories.json');
const products = require('./data/products.json');

app.use(cors());


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