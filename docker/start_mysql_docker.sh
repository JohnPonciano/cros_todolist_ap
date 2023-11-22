# Construa a imagem Docker (substitua 'mysql-server' pelo nome da imagem desejada)
docker build -t mysql-server .

# Copie o script SQL para o contêiner
docker cp init.sql mysql-container:/docker-entrypoint-initdb.d/init.sql

# Execute o contêiner
docker run --name mysql-container -e MYSQL_DATABASE=mydatabase -e MYSQL_USER=myuser -e MYSQL_PASSWORD=mypassword -e MYSQL_ROOT_PASSWORD=rootpassword -p 3306:3306 -d mysql-server
