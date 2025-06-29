# Stage 1: Build the Spring Boot application
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml mvnw .
COPY .mvn .mvn
COPY src src
RUN mvn clean package -DskipTests

# Stage 2: Runtime image with MySQL and Spring Boot
FROM ubuntu:22.04

# Install MySQL, Java, Supervisor
RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y \
       default-mysql-server \
       openjdk-17-jdk \
       supervisor \
    && rm -rf /var/lib/apt/lists/*

# Configure MySQL root password and database
RUN service mysql start \
    && mysql --execute="ALTER USER 'root'@'localhost' IDENTIFIED BY 'root@123';" \
    && mysql --execute="CREATE DATABASE IF NOT EXISTS ZPMS;" \
    && mysql --execute="FLUSH PRIVILEGES;"

# Copy SQL dump and import into ZPMS
COPY zpms.sql /tmp/zpms.sql
RUN service mysql start \
    && mysql -uroot -proot@123 ZPMS < /tmp/zpms.sql

# Copy the Spring Boot jar
COPY --from=builder /app/target/demo-0.0.1-SNAPSHOT.jar /app/app.jar

# Supervisor config
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose both MySQL and app ports
EXPOSE 3306 8080

# Start Supervisor as PID 1
CMD ["/usr/bin/supervisord", "-n"]
