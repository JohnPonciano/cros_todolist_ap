const prisma = require('../prisma/prismaClient');

const createSubtask = async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, status } = req.body;

    try {
        const parentTask = await prisma.task.findUnique({
            where: { id: parseInt(id) }
        });

        if (!parentTask) {
            return res.status(404).json({ error: 'Tarefa principal não encontrada' });
        }

        const subtask = await prisma.subtask.create({  // Corrigido para prisma.subtask.create
            data: {
                titulo,
                descricao,
                status,
                taskId: parentTask.id // Relacionando a subtask com a tarefa principal usando taskId
            }
        });

        res.json(subtask);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar subtask' });
    }
};

const updateSubtask = async (req, res) => {
    const { taskId, subtaskId } = req.params;
    const { titulo, descricao, status } = req.body;

    try {
        const updatedSubtask = await prisma.subtask.update({
            where: { id: parseInt(subtaskId) },
            data: {
                titulo,
                descricao,
                status
            }
        });
        res.json(updatedSubtask);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar a subtarefa' });
    }
};

const deleteSubtask = async (req, res) => {
    const { taskId, subtaskId } = req.params;

    try {
        await prisma.subtask.delete({
            where: { id: parseInt(subtaskId) }
        });
        res.json({ message: 'Subtarefa excluída com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir a subtarefa' });
    }
};

const filterSubtasksByStatus = async (req, res) => {
    const { taskId, status } = req.params;

    try {
        const subtasks = await prisma.subtask.findMany({
            where: { AND: [{ status }, { taskId: parseInt(taskId) }] }
        });
        res.json(subtasks);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao filtrar subtarefas por status' });
    }
};

module.exports = {
    createSubtask,
    updateSubtask,
    deleteSubtask,
    filterSubtasksByStatus
};