import express from 'express';
import cors from 'cors';
import Promise from 'bluebird'
import bodyParser from 'body-parser'
import isomorphic from 'isomorphic-fetch'


import upLoadObject from './middlewares/upLoadObject'
import find from './find'

const __DEV__ = true;


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(upLoadObject);

app.get('/', async (req, res) => {

    return res.send(JSON.stringify((req.pc)));
})
app.get('/volumes', async (req, res) => {
    var inputValue = req.pc.hdd;
    var result = {};
    for(var i=0;i<inputValue.length;i++){

        result[inputValue[i].volume] = ((result[inputValue[i].volume])? result[inputValue[i].volume]:0) + Number(inputValue[i].size);
    }
    return res.send(JSON.stringify(result));
})

app.get('/*', async (req, res) => {
    var regex = new RegExp('/', 'g');
    var findSearch = (req.params[0]).split(regex);
    var result = find(req.pc, findSearch)
    if (result == 'Not Found') {return res.status(404).send(result);}
    else {return res.send(JSON.stringify(result));}
})




//Добавляем mw для загрузки объекта при старте

/*
app.get('/users',isAdmin, async (req, res) => {
    const users = await User.find();
    return res.json(users);
})

app.get('/pets', async (req,res) => {
    const pets = await Pet.find().populate('owner');
    return res.json(pets);
})

app.get('/clear', async (req,res) => {
    await User.remove({});
    await Pet.remove({});
    return res.send('OK');
})

app.post('/data',async (req, res) => {
    const data = req.body;
    if (!data.user) return res.status(400).send('user required');
    if (!data.pets) data.pets = [];

    const user = await User.findOne({
        name: data.user.name,
    });

    if (user) return res.status(400).send('user.name is exists')

    try {
        const result = await saveDataInDb(data);
        return res.json(result);
    } catch (err) {
        return res.status(500).json(err);
    }
})
*/

app.listen(3000, function () {
    console.log('Example app listening on port 3000');
})
