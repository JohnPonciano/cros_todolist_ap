# Use a imagem oficial do MySQL
FROM mysql:latest

# Defina variáveis de ambiente para o MySQL
ENV MYSQL_DATABASE=mydatabase
ENV MYSQL_USER=myuser
ENV MYSQL_PASSWORD=mypassword
ENV MYSQL_ROOT_PASSWORD=rootpassword

# Exponha a porta padrão do MySQL (3306)
EXPOSE 3306

# Copie os scripts SQL para um diretório no contêiner (opcional)
COPY init.sql /docker-entrypoint-initdb.d/
