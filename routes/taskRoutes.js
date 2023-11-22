const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const subtaskController = require('../controllers/subtaskController');
const authenticateToken = require('../middlewares/authMiddleware');

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
 *                 example: Em andamento
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
 *                 example: Concluída
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
 * /tasks/{id}/complete:
 *   put:
 *     summary: Marcar uma tarefa como concluída pelo ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Tarefa marcada como concluída com sucesso
 *       '500':
 *         description: Erro ao marcar tarefa como concluída
 */
router.put('/:id/complete', taskController.markTaskAsCompleted);
/**
 * @swagger
 * /tasks/{id}/incomplete:
 *   put:
 *     summary: Marcar uma tarefa como incompleta pelo ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Tarefa marcada como incompleta com sucesso
 *       '500':
 *         description: Erro ao marcar tarefa como incompleta
 */
router.put('/:id/incomplete', taskController.markTaskAsIncomplete);
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
 *                 example: Em andamento
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
 *                 example: Novo Título da Subtarefa
 *               descricao:
 *                 type: string
 *                 example: Nova Descrição da Subtarefa
 *               status:
 *                 type: string
 *                 example: Concluída
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
router.get('/:taskId/subtasks/status/:status', subtaskController.filterSubtasksByStatus); // Filtrar subtarefas por status

module.exports = router;
