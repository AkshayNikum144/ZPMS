# Stage 1: Build the Spring Boot application
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml mvnw .              # Copy Maven wrapper and POM
COPY .mvn .mvn                   # Copy .mvn directory
COPY src src                     # Copy source code
RUN mvn clean package -DskipTests

# Stage 2: Runtime image with MySQL and Spring Boot
FROM ubuntu:22.04

# Install MySQL, Java, and Supervisor
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
    default-mysql-server \
    openjdk-17-jdk \
    supervisor && \
    rm -rf /var/lib/apt/lists/*

# Configure MySQL password and create DB
RUN service mysql start && \
    mysql --execute="ALTER USER 'root'@'localhost' IDENTIFIED BY 'root@123';" && \
    mysql --execute="CREATE DATABASE IF NOT EXISTS ZPMS;" && \
    mysql --execute="FLUSH PRIVILEGES;"

# Copy SQL dump file (make sure it's named exactly as below in your repo)
COPY zpms.sql /tmp/zpms.sql

# Import SQL into ZPMS DB
RUN service mysql start && \
    sleep 5 && \
    mysql -uroot -proot@123 ZPMS < /tmp/zpms.sql

# Copy Spring Boot JAR
COPY --from=builder /app/target/demo-0.0.1-SNAPSHOT.jar /app/app.jar

# Copy Supervisor config
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose MySQL and Spring Boot ports
EXPOSE 3306 8080

# Start Supervisor to run both MySQL and Spring Boot
CMD ["/usr/bin/supervisord", "-n"]
