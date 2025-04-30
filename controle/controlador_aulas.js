function pegarTodasAsAulas(req, res) {
    const id = req.params.id;
    fs.readFile('bancoDeDados.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao ler o arquivo');
        }
        const aulas = JSON.parse(data); 
        const aula = aulas.find(aula => aula.id == id); 
        if (aula) {
            return res.status(200).send(aula);
        } else {
            return res.status(404).send('Aula não encontrada');
        }
    });
}


function pegarAulaPorId(req, res) {
    const id = req.params.id;
    fs.readFile('bancoDeDados.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao ler o arquivo');
        }
        const aulas = JSON.parse(data);
        const aula = aulas.find(aula => aula.id == id);
        if (aula) {
            return res.status(200).send(aula);
        } else {
            return res.status(404).send('Aula não encontrada');
        }
    });
}

module.exports ={
    pegarTodasAsAulas, 
    pegarAulaPorId,
}