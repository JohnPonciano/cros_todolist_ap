// const prisma = require('../prisma/prismaClient');

// const createSubsubtaskInSubtask = async (req, res) => {
//     const { taskId, subtaskId } = req.params;
//     const { titulo, descricao, status } = req.body;

//     try {
//         const parentSubtask = await prisma.subtask.findUnique({
//             where: { id: parseInt(subtaskId) }
//         });

//         if (!parentSubtask) {
//             console.log('Subtarefa não encontrada');
//             return res.status(404).json({ error: 'Subtarefa não encontrada' });
//         }

//         const subsubtask = await prisma.subSubtask.create({
//             data: {
//                 titulo,
//                 descricao,
//                 status,
//                 subtask: { connect: { id: parentSubtask.id } }
//             }
//         });

//         console.log('Sub-subtarefa criada:', subsubtask);
//         res.json(subsubtask);
//     } catch (error) {
//         console.error('Erro ao criar sub-subtarefa:', error);
//         res.status(500).json({ error: 'Erro ao criar sub-subtarefa' });
//     }
// };

// const updateSubsubtaskInSubtask = async (req, res) => {
//     const { taskId, subtaskId, subsubtaskId } = req.params;
//     const { titulo, descricao, status } = req.body;

//     try {
//         const updatedSubsubtask = await prisma.subSubtask.update({
//             where: { id: parseInt(subsubtaskId) },
//             data: {
//                 titulo,
//                 descricao,
//                 status
//             }
//         });

//         console.log('Sub-subtarefa atualizada:', updatedSubsubtask);
//         res.json(updatedSubsubtask);
//     } catch (error) {
//         console.error('Erro ao atualizar a sub-subtarefa:', error);
//         res.status(500).json({ error: 'Erro ao atualizar a sub-subtarefa' });
//     }
// };

// const deleteSubsubtaskInSubtask = async (req, res) => {
//     const { taskId, subtaskId, subsubtaskId } = req.params;

//     try {
//         await prisma.subSubtask.delete({
//             where: { id: parseInt(subsubtaskId) }
//         });

//         console.log('Sub-subtarefa excluída com sucesso');
//         res.json({ message: 'Sub-subtarefa excluída com sucesso' });
//     } catch (error) {
//         console.error('Erro ao excluir a sub-subtarefa:', error);
//         res.status(500).json({ error: 'Erro ao excluir a sub-subtarefa' });
//     }
// };

// module.exports = {
//     createSubsubtaskInSubtask,
//     updateSubsubtaskInSubtask,
//     deleteSubsubtaskInSubtask
// };
