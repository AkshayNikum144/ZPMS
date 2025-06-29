# Stage 1: Build Spring Boot App
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml mvnw .              
COPY .mvn .mvn                  
COPY src src                    
RUN mvn clean package -DskipTests

# Stage 2: Runtime with MySQL and Spring Boot
FROM ubuntu:22.04

# Install MySQL, Java, and Supervisor
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
    default-mysql-server \
    openjdk-17-jdk \
    supervisor && \
    rm -rf /var/lib/apt/lists/*

# Configure MySQL and create empty DB
RUN service mysql start && \
    mysql --execute="ALTER USER 'root'@'localhost' IDENTIFIED BY 'root@123';" && \
    mysql --execute="CREATE DATABASE IF NOT EXISTS ZPMS;" && \
    mysql --execute="FLUSH PRIVILEGES;"

# Copy Spring Boot JAR
COPY --from=builder /app/target/demo-0.0.1-SNAPSHOT.jar /app/app.jar

# Copy Supervisor config
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose MySQL and App ports
EXPOSE 3306 8080

# Start both MySQL and Spring Boot using Supervisor
CMD ["/usr/bin/supervisord", "-n"]
