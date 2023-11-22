const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota para criar um usuário
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Criar um usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Nome do Usuário
 *               email:
 *                 type: string
 *                 example: usuario@example.com
 *               senha:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       '200':
 *         description: Usuário criado com sucesso
 *       '500':
 *         description: Erro ao criar usuário
 */
router.post('/register', userController.createUser);
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Autenticar um usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@example.com
 *               senha:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       '200':
 *         description: Usuário autenticado com sucesso
 *       '401':
 *         description: Falha na autenticação do usuário
 */
// Rota para autenticar um usuário
router.post('/login', userController.login);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obter todos os usuários
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: Lista de usuários retornada com sucesso
 *       '500':
 *         description: Erro ao obter usuários
 */
// Rota para obter todos os usuários
router.get('/', userController.getAllUsers);

module.exports = router;
