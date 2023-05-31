const {Router} = require("express");
const { messagesDao } = require("../dao/index.js")
const routerMensajes = Router();
const messages = new messagesDao;

routerMensajes
.route('/:id?')
.get(async(req, res) =>{
    if (req.params.id){
        const message = await messages.getByMailMessages(req.params.id);
        if(message){
            res.status(200).json(message);
        }else{
            res.status(404).send({ message: "Mensaje no encontrado"});
        }
    }else{
        const products = await messages.getAllMessages();
        if(products){
            res.status(200).json(products);
        }else{
            res.status(400).send({ Message: "Mensaje no encontrado"})
        }
    }
})

routerMensajes
.route('/:mail?')
.put( (req, res) =>{
    const message = messages.updateById(req.params.mail, req.body);
    if(message){
        res.status(201).json(`el mensaje no se ha actualizado correctamente`)
    }else{
        res.status(404).json({error:'No existen mensajes con ese mail'})
    }
})

module.exports = { routerMensajes }