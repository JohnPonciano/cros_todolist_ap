const prisma = require('../prisma/prismaClient');

const createSubtask = async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, status } = req.body;

    try {
        const parentTask = await prisma.task.findUnique({
            where: { id: parseInt(id) }
        });

        if (!parentTask) {
            console.log('Tarefa principal não encontrada');
            return res.status(404).json({ error: 'Tarefa principal não encontrada' });
        }

        const subtask = await prisma.subtask.create({
            data: {
                titulo,
                descricao,
                status,
                task: { connect: { id: parentTask.id } }
            },
            include: {
                subSubtasks: true // Incluindo as subsubtasks associadas à subtask criada
            }
        });

        console.log('Subtarefa criada:', subtask);
        res.json(subtask);
    } catch (error) {
        console.error('Erro ao criar subtask:', error);
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

        console.log('Subtarefa atualizada:', updatedSubtask);
        res.json(updatedSubtask);
    } catch (error) {
        console.error('Erro ao atualizar a subtarefa:', error);
        res.status(500).json({ error: 'Erro ao atualizar a subtarefa' });
    }
};

const deleteSubtask = async (req, res) => {
    const { taskId, subtaskId } = req.params;

    try {
        await prisma.subtask.delete({
            where: { id: parseInt(subtaskId) }
        });

        console.log('Subtarefa excluída com sucesso');
        res.json({ message: 'Subtarefa excluída com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir a subtarefa:', error);
        res.status(500).json({ error: 'Erro ao excluir a subtarefa' });
    }
};

const filterSubtasksByStatus = async (req, res) => {
    const { taskId, status } = req.params;

    try {
        const subtasks = await prisma.subtask.findMany({
            where: { AND: [{ status }, { taskId: parseInt(taskId) }] }
        });

        console.log('Subtarefas filtradas por status:', subtasks);
        res.json(subtasks);
    } catch (error) {
        console.error('Erro ao filtrar subtarefas por status:', error);
        res.status(500).json({ error: 'Erro ao filtrar subtarefas por status' });
    }
};

module.exports = {
    createSubtask,
    updateSubtask,
    deleteSubtask,
    filterSubtasksByStatus
};
