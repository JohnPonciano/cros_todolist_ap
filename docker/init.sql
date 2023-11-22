-- Criação da tabela User
CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL
);

-- Criação da tabela Task
CREATE TABLE Task (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    status ENUM('concluida', 'nao_concluida') DEFAULT 'nao_concluida',
    userId INT,
    FOREIGN KEY (userId) REFERENCES User(id)
);

-- Criação da tabela Subtask
CREATE TABLE Subtask (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    status ENUM('concluida', 'nao_concluida') DEFAULT 'nao_concluida',
    taskId INT,
    FOREIGN KEY (taskId) REFERENCES Task(id)
);
