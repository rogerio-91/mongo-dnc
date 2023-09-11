const express = require('express');
const app = express();
const mongoose = require('mongoose');
const familiaModel = require('./src/model/familia');
const userModel = require('./src/model/user');

app.use(express.json());


app.post('/familias', async (req, res) => {
    const response = await familiaModel.create({
        nome: req.body.nome,
        idade: req.body.idade,
        profissao: req.body.profissao
    })
    return res.status(201).json({
        data: response
    })
});

app.get('/familias', async (req, res) => {
    if (req.query.idade) {
        // const membros = await familiaModel.find({}).where('idade').gt(req.query.idade)
        const membros = await familiaModel.find({}).gt('idade', req.query.idade);

        return res.status(200).json({
            data: membros
        })
    };

    const membros = await familiaModel.find({})

    return res.status(200).json({
        data: membros
    })

});

app.get('/familias/:id', async (req, res) => {
    try {
        const membro = await familiaModel.findById(req.params.id)
        return res.status(200).json({
            data: membro
        });
    }

    catch (error) {
        res.status(400).json({
            data: {},
            message: 'Id not found'
        })
    }

});

app.put('/familias/:id', async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(400).json({
            data: {},
            message: 'The Id does not correspond to a valid ObjectId.'
        })
    }
    const membro = await familiaModel.updateOne({ _id: req.params.id }, req.body)

    return res.status(200).json({
        data: membro
    })
});

app.delete('/familias/:id', async (req,res) => {
    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(400).json({
            data: {},
            message: 'The Id does not correspond to a valid ObjectId.'
        })
    }
    
    const membro = await familiaModel.deleteOne({ _id: req.params.id })
    
    return res.status(200).json({
        data: membro
    })
});

app.listen(8080, () => {
    console.log('Server is live!')
});