# Etapa 1: Construcción del Frontend (Next.js)
FROM node:latest AS frontend-builder
WORKDIR /app

# Copiar los archivos necesarios
COPY front/package*.json ./
RUN npm install
COPY front/ .

# Construir el frontend con Next.js
RUN npm run build

# Etapa 2: Construcción del Backend (Spring Boot)
FROM maven:3.8.5-openjdk-17 AS backend-builder
WORKDIR /app
COPY backend/pom.xml ./
RUN mvn dependency:resolve
COPY backend/src ./src
RUN mvn package -DskipTests

# Etapa 3: Configuración del contenedor final con MySQL y aplicación
FROM mysql:8.0-debian
WORKDIR /app

# Configurar la base de datos MySQL
ENV MYSQL_DATABASE=mi_base_datos
ENV MYSQL_USER=mi_usuario
ENV MYSQL_PASSWORD=mi_contrasena
ENV MYSQL_ROOT_PASSWORD=mi_root_password

# Copiar el frontend construido
COPY --from=frontend-builder /app/.next ./frontend

# Cambiar a una etapa final con Java y MySQL
FROM openjdk:17-jdk-slim
WORKDIR /app

# Instalar MySQL
RUN apt-get update && apt-get install -y mysql-client && apt-get clean

# Copiar el backend compilado
COPY --from=backend-builder /app/target/*.jar app.jar

# Variables de entorno para conexión a MySQL
ENV SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/mi_base_datos
ENV SPRING_DATASOURCE_USERNAME=mi_usuario
ENV SPRING_DATASOURCE_PASSWORD=mi_contrasena

# Exponer los puertos necesarios
EXPOSE 8080 3000 3306

# Comando para iniciar la aplicación Spring Boot
CMD ["java", "-jar", "app.jar"]
