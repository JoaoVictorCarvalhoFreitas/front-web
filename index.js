import express from 'express'
import {PrismaClient} from '@prisma/client' 
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Obtém o caminho do módulo atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient()



var app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, 'paginas')));

app.get('/Usuarios', async (req, res) => {
    const users = await prisma.Usuarios.findMany();
    res.json(users);
  });

app.get('/cadastre-se', async (req, res) => {
    res.sendFile(path.join(__dirname, 'paginas', 'cadastre-se.html'));
    });


  
app.post('/Usuarios', async (req, res) => {
const { name, email, senha } = req.body;
console.log(req.body);
const newUser = await prisma.usuarios.create({
    data: {
    name,
    email,
    senha
    },
});
res.json(newUser);
});

app.post('/cadastre-se', async (req, res) => {
    const { name, email, senha } = req.body;

    try {
        // Criar um novo usuário no banco de dados
        const newUser = await prisma.Usuarios.create({
            data: {
                name,
                email,
                senha
            },
        });
        res.status(201).json(newUser); // Retorna o novo usuário com status 201 Created
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});




const port = 3000


app.get('/', (req, res) => {
    res.send()}
)


app.listen(port, () => {
    console.log(`Server esta rodando no endereço http://localhost:${port}`)
    })

