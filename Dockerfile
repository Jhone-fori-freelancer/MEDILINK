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
COPY backend/src ./src
RUN mvn package

# Etapa 3: Configuración del contenedor final
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copiar Frontend construido y servirlo como estático
COPY --from=frontend-builder /app/build ./frontend

# Copiar Backend compilado
COPY --from=backend-builder /app/target/*.jar app.jar

# Configuración para el backend
ENV SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/mi_base_datos
ENV SPRING_DATASOURCE_USERNAME=mi_usuario
ENV SPRING_DATASOURCE_PASSWORD=mi_contraseña

# Ejecuta la aplicación Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]

# Exposición de puertos
EXPOSE 8080 3000

# Información de uso para MySQL
# Puedes gestionar la base de datos MySQL por separado en Docker Compose
# o instalarla como un servicio externo para persistencia más confiable
