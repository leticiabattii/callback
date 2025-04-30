const express =require('express') //importar modulo express do npm

const app = express() //inicializa o servidor express e salva ma variavel app 
const PORT = 8000//separa uma porta para rodar o servidor

const bancoDeDados = [
    {
        id: 1,
        titulo: "desenvolvimento de sistemas",
        curso:"tecnico em desenvolvimento",
        turma: "3b",
        professor: "Ramon",
    }
]

app.get('/aulas', (req, res) => {
    fs.readFile('bancoDeDados.json', 'utf-8', (err,data) => {
        if (err) {
            res.status(500).json ({msg:"erro no servidor"})
        }
        res.status(200).json(JSON.parse(data))
    })
    
    }) 

app.get('/aulas/:id', (req,res) =>{
    const id = req.params.id;
    fs.readFile('bancoDeDados.json', 'utf-8', (err, data) => {
        if(err){
            res.status(500).json({msg:"erro nos servidor"})
        }
        const usuarios = JSON.parse(data)
        const user = usuarios.find(user => user.id == id)
        if(user){
            res.status(200).json(user)
        }
        res.status(404).json({msg: 'Usuario nao encontrado'})
    })
})

app.post('/aulas', (req,res) => {
        const dados =req.body
        dados['id'] = bancoDeDados.length +1
        bancoDeDados.push(dados)
        res.status(201).send(dados)
    })

app.put('/aulas/:id' , (req, res) => {
    const id = req.params.id
    //procurar o id do array
    const usuario = bancoDeDados.find(user => user.id === id)
    if(!usuario){
        res.status(404).json({msg: 'usuario nao encontrado'})
    }
    res.send('ok')
})

app.delete('/aulas/:id', (req,res) => {
    const id = req.params.id
    const userIndex = bancoDeDados.findIndex(user => user.id === id)
    if(userIndex = -1){
        res.status(404).json({msg: 'Usuario nao encontrado'})
    }
    bancoDeDados.splice(userIndex, 1)
    res.status(204).send()
})

app.listen(PORT, () => {console.log('servidor online')})  

app.get('/aulas', (req,res) => {res.send('aulas de desenvolvimento da 3b')})
app.post('/aulas', (req,res) => {res.send('criando uma aula')})


app.listen(PORT, () => {console.log('servidor online')}) 