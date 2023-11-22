const prisma = require('../prisma/prismaClient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const hashedPassword = await bcrypt.hash(senha, 10);
        const user = await prisma.user.create({
            data: { nome, email, senha: hashedPassword }
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
};

const login = async (req, res) => {
    const { email, senha } = req.body;
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const passwordMatch = await bcrypt.compare(senha, user.senha);
    if (!passwordMatch) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken });
};

const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                email: true,
                nome: true
            }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter todos os usuários' });
    }
};


module.exports = {
    createUser,
    login,
    getAllUsers
};
