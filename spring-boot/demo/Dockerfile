# Stage 1: Build Spring Boot App
FROM maven:3.9.6-eclipse-temurin-17 AS builder

WORKDIR /app
COPY pom.xml .
COPY src src
RUN mvn clean package -DskipTests

# Stage 2: Lightweight Runtime
FROM eclipse-temurin:17-jdk

WORKDIR /app
COPY --from=builder /app/target/demo-0.0.1-SNAPSHOT.jar /app/app.jar

# Expose the port to Render
EXPOSE 8080

# Run the Spring Boot application
CMD ["java", "-jar", "/app/app.jar"]
