const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const app = express();

// Configuração do Swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Tarefas e Subtarefas',
            version: '1.0.0',
            description: 'Documentação da API de tarefas e subtarefas',
        },
        servers: [
            {
                url: 'http://localhost:3000', // Coloque a URL da sua API aqui
                description: 'Servidor local',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./routes/*.js'], // Coloque o caminho correto para os seus arquivos de rotas
};

const specs = swaggerJsdoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// Middlewares
app.use(express.json()); // Habilita o uso de JSON nas requisições

// Rotas
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

// Porta para o servidor Express
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando!! ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
