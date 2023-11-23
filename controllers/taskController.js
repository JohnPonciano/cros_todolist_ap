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

        console.log('Nova tarefa criada:', newTask);
        res.json(newTask);
    } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        res.status(500).json({ error: 'Erro ao criar tarefa' });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({
            include: {
                subtasks: {
                    include:{
                        subSubtasks: true,
                    },
                },
            },
        });

        console.log('Todas as tarefas:', tasks);
        res.json(tasks);
    } catch (error) {
        console.error('Erro ao obter todas as tarefas:', error);
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
            console.log('Tarefa não encontrada');
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }
        console.log('Tarefa encontrada:', task);
        res.json(task);
    } catch (error) {
        console.error('Erro ao obter a tarefa pelo ID:', error);
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

        console.log('Tarefa atualizada:', updatedTask);
        res.json(updatedTask);
    } catch (error) {
        console.error('Erro ao atualizar a tarefa:', error);
        res.status(500).json({ error: 'Erro ao atualizar a tarefa' });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.task.delete({
            where: { id: parseInt(id) }
        });

        console.log('Tarefa excluída com sucesso');
        res.json({ message: 'Tarefa excluída com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir a tarefa:', error);
        res.status(500).json({ error: 'Erro ao excluir a tarefa' });
    }
};

const filterTasksByStatus = async (req, res) => {
    const { status } = req.params;
    let statusValue;

    // Mapeamento dos valores recebidos para valores no banco de dados
    switch (status) {
        case 'concluida':
            statusValue = 'concluida';
            break;
        case 'nao_concluida':
            statusValue = 'nao_concluida';
            break;
        case 'em_progresso':
            statusValue = 'em_progresso';
            break;
        default:
            // Se nenhum dos valores corresponder, você pode lidar com isso aqui
            res.status(400).json({ error: 'Status inválido' });
            return;
    }

    try {
        const tasks = await prisma.task.findMany({
            where: { status: statusValue },
        });

        console.log(`Tarefas filtradas pelo status '${status}':`, tasks);
        res.json(tasks);
    } catch (error) {
        console.error('Erro ao filtrar tarefas por status:', error);
        res.status(500).json({ error: 'Erro ao filtrar tarefas por status' });
    }
};


module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    filterTasksByStatus,
};
