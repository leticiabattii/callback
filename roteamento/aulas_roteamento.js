const express = require('express')
const {pegarTodasAsAulas, pegarAulaPorId} = require('../controle/controlador_aulas.js')
const router_aulas = express.Router()

const {bancodeDados, readFile} = require('../modelo/aulas_modelo.js')//importa o arquivo de modelo


//incluir as rotas que fazem parte deste roteador
router_aulas.get('/aulas', (req,res) => {
    res.status(200).send(bancodeDados)
})

router_aulas.get('/aulas/:id', (req,res)=>{
    const id = req.params.id
    fs.readFile('bancoDeDados.json', 'utf-8', (err, data) =>{
        if (err) {
            return res.status(500).send('Erro ao ler o arquivo');
        }
        const aulas = JSON.parse(data)
        const aula = usuarios.find(aula => aula.id == id)
        if (aula) {
            return res.status(200).send(aula);
        } else {
            return res.status(404).send('Usuário não encontrado');
        }
    })
})

router_aulas.post('/aulas', (req, res) => {
    const dados = req.body
    fs.readFile('bancoDeDados.json', 'utf-8', (err, data) => {
        if(err){
            return res.status(500).send('Erro ao ler o arquivo');
        }
        const aulas = JSON.parse(data)
        dados['id'] = aulas.length + 1
        aulas.push(dados)
        fs.writeFile('bancoDeDados.json', JSON.stringify(aulas), (err) => {
            if (err) {
                return res.status(500).send('Erro ao escrever no arquivo');
            }
        })
        console.log(aulas)
    })
    res.status(201).send(dados)
})

router_aulas.put('/aulas/:id', (req,res)=>{
    const id = req.params.id;
    const usuario = bancodeDados.find(user => user.id == id);
    if (!usuario){
        return res.status(404).json({msg:"Usuario não encontrado"});
    }
    Object.assign(usuario, req.body);
    res.status(200).json(usuario);
});


router_aulas.delete('/aulas/:id', (req, res) => {
    const id = req.params.id;
    const index = bancodeDados.findIndex(user => user.id == id);

    if (index === -1) {
        return res.status(404).json({msg: "Usuario não encontrado"});
    }

    bancodeDados.splice(index, 1);
    res.status(200).json({msg: "Usuario deletado com sucesso"});
});

module.exports = router_aulas