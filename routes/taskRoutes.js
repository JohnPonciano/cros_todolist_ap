const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const subtaskController = require('../controllers/subtaskController');
const authenticateToken = require('../middlewares/authMiddleware');
const subsubtaskController = require('../controllers/subsubtaskController')

router.use(authenticateToken)
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Criar uma tarefa
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Título da Tarefa 1
 *               descricao:
 *                 type: string
 *                 example: Descrição da Tarefa 1
 *               status:
 *                 type: string
 *                 example: nao_concluida
 *               userId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       '200':
 *         description: Tarefa criada com sucesso
 *       '500':
 *         description: Erro ao criar tarefa
 */
router.post('/', taskController.createTask);
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Listar todas as tarefas
 *     tags: [Tasks]
 *     responses:
 *       '200':
 *         description: Lista de tarefas retornada com sucesso
 *       '500':
 *         description: Erro ao listar tarefas
 */
router.get('/', taskController.getAllTasks);
/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Obter uma tarefa pelo ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Tarefa encontrada com sucesso
 *       '404':
 *         description: Tarefa não encontrada
 */
router.get('/:id', taskController.getTaskById);
/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Atualizar uma tarefa pelo ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Novo Título da Tarefa
 *               descricao:
 *                 type: string
 *                 example: Nova Descrição da Tarefa
 *               status:
 *                 type: string
 *                 example: concluida
 *     responses:
 *       '200':
 *         description: Tarefa atualizada com sucesso
 *       '500':
 *         description: Erro ao atualizar tarefa
 */
router.put('/:id', taskController.updateTask);
/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Deletar uma tarefa pelo ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Tarefa excluída com sucesso
 *       '500':
 *         description: Erro ao excluir tarefa
 */
router.delete('/:id', taskController.deleteTask);
/**
 * @swagger
 * /tasks/status/{status}:
 *   get:
 *     summary: Filtrar as tarefas pelo status
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *     description: Opções disponiveis - em_progresso, nao_concluida, concluida
 *     responses:
 *       '200':
 *         description: Lista de tarefas filtrada por status retornada com sucesso
 *       '500':
 *         description: Erro ao filtrar tarefas por status
 */
router.get('/status/:status', taskController.filterTasksByStatus);


/**
 * @swagger
 * /tasks/{id}/subtasks:
 *   post:
 *     summary: Criar uma subtarefa para uma tarefa específica pelo ID
 *     tags: [Subtasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Título da Subtarefa 1
 *               descricao:
 *                 type: string
 *                 example: Descrição da Subtarefa 1
 *               status:
 *                 type: string
 *                 example: nao_concluida
 *     responses:
 *       '200':
 *         description: Subtarefa criada com sucesso
 *       '500':
 *         description: Erro ao criar subtarefa
 */
router.post('/:id/subtasks', subtaskController.createSubtask); // Criar uma subtarefa
/**
 * @swagger
 * /tasks/{taskId}/subtasks/{subtaskId}:
 *   put:
 *     summary: Atualizar uma subtarefa de uma tarefa específica pelo ID
 *     tags: [Subtasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: subtaskId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Título da Subtarefa 1
 *               descricao:
 *                 type: string
 *                 example: Descrição da Subtarefa 1
 *               status:
 *                 type: string
 *                 example: nao_concluida
 *     responses:
 *       '200':
 *         description: Subtarefa atualizada com sucesso
 *       '500':
 *         description: Erro ao atualizar subtarefa
 */
router.put('/:taskId/subtasks/:subtaskId', subtaskController.updateSubtask); // Atualizar uma subtarefa
/**
 * @swagger
 * /tasks/{taskId}/subtasks/{subtaskId}:
 *   delete:
 *     summary: Excluir uma subtarefa de uma tarefa específica pelo ID
 *     tags: [Subtasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: subtaskId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Subtarefa excluída com sucesso
 *       '500':
 *         description: Erro ao excluir subtarefa
 */
router.delete('/:taskId/subtasks/:subtaskId', subtaskController.deleteSubtask); // Excluir uma subtarefa
/**
 * @swagger
 * /tasks/{taskId}/subtasks/status/{status}:
 *   get:
 *     summary: Filtrar subtarefas por status de uma tarefa específica pelo ID
 *     tags: [Subtasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lista de subtarefas filtrada por status retornada com sucesso
 *       '500':
 *         description: Erro ao filtrar subtarefas por status
 */
router.get('/:taskId/subtasks/status/:status', subtaskController.filterSubtasksByStatus);


// /**
//  * @swagger
//  * /tasks/:taskId/subtasks/:subtaskId/subsubtasks:
//  *   post:
//  *     summary: Criar uma sub-subtarefa
//  *     tags: [Sub-subtask]
//  *     description: Cria uma sub-subtarefa para uma subtarefa específica.
//  *     parameters:
//  *       - in: path
//  *         name: taskId
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: ID da tarefa.
//  *       - in: path
//  *         name: subtaskId
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: ID da subtarefa associada à tarefa.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               titulo:
//  *                 type: string
//  *                 example: Título da Subtarefa 1
//  *               descricao:
//  *                 type: string
//  *                 example: Descrição da Subtarefa 1
//  *               status:
//  *                 type: string
//  *                 example: nao_concluida
//  *     responses:
//  *       '200':
//  *         description: Sub-subtarefa criada com sucesso
//  *       '404':
//  *         description: Subtarefa não encontrada
//  *       '500':
//  *         description: Erro ao criar sub-subtarefa
//  */
// router.post('/tasks/:taskId/subtasks/:subtaskId/subsubtasks', subsubtaskController.createSubsubtaskInSubtask);

// /**
//  * @swagger
//  * /tasks/:taskId/subtasks/:subtaskId/subsubtasks/:subsubtaskId:
//  *   put:
//  *     summary: Atualizar uma sub-subtarefa
//  *     tags: [Sub-subtask]
//  *     description: Atualiza uma sub-subtarefa específica de uma subtarefa associada a uma tarefa.
//  *     parameters:
//  *       - in: path
//  *         name: taskId
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: ID da tarefa.
//  *       - in: path
//  *         name: subtaskId
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: ID da subtarefa associada à tarefa.
//  *       - in: path
//  *         name: subsubtaskId
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: ID da sub-subtarefa associada à tarefa.
//  *       - in: body
//  *         name: subsubtask
//  *         required: true
//  *         schema:
//  *           type: object
//  *           properties:
//  *             titulo:
//  *               type: string
//  *               example: Novo Título da Subtarefa 1
//  *             descricao:
//  *               type: string
//  *               example: Nova Descrição da Subtarefa 1
//  *             status:
//  *               type: string
//  *               example: em_progresso
//  *               enum: [em_progresso, concluida, nao_concluida] # Enumerating possible status values
//  *     responses:
//  *       '200':
//  *         description: Sub-subtarefa atualizada com sucesso
//  *       '404':
//  *         description: Subtarefa ou sub-subtarefa não encontrada
//  *       '500':
//  *         description: Erro ao atualizar a sub-subtarefa
//  */
// router.put('/tasks/:taskId/subtasks/:subtaskId/subsubtasks/:subsubtaskId', subsubtaskController.updateSubsubtaskInSubtask);

// /**
//  * @swagger
//  * /tasks/:subtaskId/subsubtasks/:subsubtaskId:
//  *   delete:
//  *     summary: Deletar uma sub-subtarefa
//  *     tags: [Sub-subtask]
//  *     description: Deleta uma sub-subtarefa específica de uma subtarefa associada a uma tarefa.
//  *     parameters:
//  *       - in: path
//  *         name: taskId
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: ID da tarefa.
//  *       - in: path
//  *         name: subtaskId
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: ID da subtarefa associada à tarefa.
//  *       - in: path
//  *         name: subsubtaskId
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: ID da sub-subtarefa associada à subtarefa.
//  *     responses:
//  *       '200':
//  *         description: Sub-subtarefa excluída com sucesso
//  *       '404':
//  *         description: Subtarefa ou sub-subtarefa não encontrada
//  *       '500':
//  *         description: Erro ao excluir a sub-subtarefa
//  */
// router.delete('/tasks/:taskId/subtasks/:subtaskId/subsubtasks/:subsubtaskId', subsubtaskController.deleteSubsubtaskInSubtask);

module.exports = router;
