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

# Etapa 3: Contenedor final
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copiar el frontend construido
COPY --from=frontend-builder /app/.next ./frontend

# Copiar el backend compilado
COPY --from=backend-builder /app/target/*.jar app.jar

# Exponer los puertos necesarios
EXPOSE 8080 3000

# Comando para iniciar la aplicación Spring Boot
CMD ["java", "-jar", "app.jar"]