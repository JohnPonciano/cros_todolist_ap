const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: 'Token de autenticação ausente' });
    }

    let token;
    if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7); // Remove a palavra 'Bearer ' para obter apenas o token
    } else {
        token = authHeader; // Usa o token completo se não começar com 'Bearer '
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        }
        
        req.user = user; // Adiciona o usuário decodificado na requisição
        next(); // Chama o próximo middleware
    });
};

module.exports = authenticateToken;
