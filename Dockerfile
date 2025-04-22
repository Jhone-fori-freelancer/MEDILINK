# Etapa 1: Construcción del Frontend (React)
FROM node:latest AS frontend-builder
WORKDIR /app
COPY front/package*.json ./
RUN npm install
COPY front/ .
RUN npm run build

# Etapa 2: Construcción del Backend (Spring Boot)
FROM maven:3.8.5-openjdk-17 AS backend-builder
WORKDIR /app
COPY backend/pom.xml ./
RUN mvn dependency:resolve
COPY backend/src ./src
RUN mvn package -DskipTests

# Etapa 3: Configuración del contenedor final con MySQL
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copiar Frontend construido y servirlo como estático
COPY --from=frontend-builder /app/build ./frontend

# Copiar Backend compilado
COPY --from=backend-builder /app/target/*.jar app.jar

# Instalar MySQL
RUN apt-get update && apt-get install -y mysql-server

# Configurar MySQL
RUN service mysql start && \
    mysql -e "CREATE DATABASE mi_base_datos;" && \
    mysql -e "CREATE USER 'mi_usuario'@'%' IDENTIFIED BY 'mi_contraseña';" && \
    mysql -e "GRANT ALL PRIVILEGES ON mi_base_datos.* TO 'mi_usuario'@'%';"

# Configuración para el backend
ENV SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/mi_base_datos
ENV SPRING_DATASOURCE_USERNAME=mi_usuario
ENV SPRING_DATASOURCE_PASSWORD=mi_contraseña

# Ejecuta la aplicación Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]

# Exposición de puertos
EXPOSE 8080 3000 3306
