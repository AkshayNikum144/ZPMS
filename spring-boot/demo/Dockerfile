# Stage 1: Build Spring Boot App
FROM maven:3.9.6-eclipse-temurin-17 AS builder

WORKDIR /app
COPY pom.xml .
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

# Set environment variables
ENV DB_USER=root
ENV DB_PASS=root@123
ENV DB_NAME=ZPMS

# Copy Spring Boot JAR from build stage
COPY --from=builder /app/target/demo-0.0.1-SNAPSHOT.jar /app/app.jar

# Copy Supervisor configuration file
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose ports: 3306 for MySQL, 8080 for Spring Boot
EXPOSE 3306 8080

# Start Supervisor (which manages MySQL and Spring Boot)
CMD ["/usr/bin/supervisord", "-n"]
