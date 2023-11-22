const prisma = require('../prisma/prismaClient');

const createTask = async (req, res) => {
    try {
        const { titulo, descricao, status, userId } = req.body;

        const newTask = await prisma.task.create({
            data: {
                titulo,
                descricao,
                status,
                userId
            }
        });

        res.json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar tarefa' });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({
            include: {
                subtasks: true,
            },
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter todas as tarefas' });
    }
};

const getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await prisma.task.findUnique({
            where: { id: parseInt(id) }
        });
        if (!task) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter a tarefa pelo ID' });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, status } = req.body;
    try {
        const updatedTask = await prisma.task.update({
            where: { id: parseInt(id) },
            data: {
                titulo,
                descricao,
                status
            }
        });
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar a tarefa' });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.task.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'Tarefa excluída com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir a tarefa' });
    }
};

const markTaskAsCompleted = async (req, res) => {
    const { id } = req.params;
    try {
        const completedTask = await prisma.task.update({
            where: { id: parseInt(id) },
            data: {
                status: 'concluida'
            }
        });
        res.json(completedTask);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao marcar a tarefa como concluída' });
    }
};

const markTaskAsIncomplete = async (req, res) => {
    const { id } = req.params;
    try {
        const incompleteTask = await prisma.task.update({
            where: { id: parseInt(id) },
            data: {
                status: 'incompleta'
            }
        });
        res.json(incompleteTask);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao marcar a tarefa como incompleta' });
    }
};

const filterTasksByStatus = async (req, res) => {
    const { status } = req.params;
    try {
        const tasks = await prisma.task.findMany({
            where: { status }
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao filtrar tarefas por status' });
    }
};



module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    markTaskAsCompleted,
    markTaskAsIncomplete,
    filterTasksByStatus,
};
