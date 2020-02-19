const mongoose = require('mongoose');

const Product = mongoose.model('Product');

// Olhar sobre o async/await
module.exports = {
    async index(req, res){
        const { page } = req.query; // Destructuring
        const products = await Product.paginate({}, { page, limit: 10 });
        return res.json(products);
    },

    async store(req, res){
        const product = await Product.create(req.body);
        return res.json(product);
    },

    async show(req, res){
        const product = await Product.findById(req.params.id);
        return res.json(product);
    },

    async update(req, res){
        // { new: true } retorna o produto atualizado. Se fosse false (default) retorna o antigo
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { 
            new: true,
            useFindAndModify: false,
        });
        return res.json(product);
    },

    async destroy(req, res){
        await Product.findByIdAndDelete(req.params.id);
        return res.send();
    }
};