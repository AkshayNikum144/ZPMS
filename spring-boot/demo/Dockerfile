### Dockerfile
```dockerfile
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
tmp_dir=/etc/supervisor/conf.d
COPY supervisord.conf ${tmp_dir}/supervisord.conf

# Expose both MySQL and app ports
EXPOSE 3306 8080

# Start Supervisor as PID 1
CMD ["/usr/bin/supervisord", "-n"]
```

---

### supervisord.conf
```ini
[supervisord]
nodaemon=true

[program:mysql]
command=/usr/bin/mysqld_safe
autostart=true
autorestart=true
stdout_logfile=/dev/stdout
stderr_logfile=/dev/stderr

environment=MYSQL_ROOT_PASSWORD="root@123"

[program:app]
command=java -jar /app/app.jar
directory=/app
autostart=true
autorestart=true
stdout_logfile=/dev/stdout
stderr_logfile=/dev/stderr
```

**How it works:**
- MySQL server and your Spring Boot JAR run in one container under Supervisor.
- The database is initialized with your `zpms.sql` dump at build time.
- Your `application.properties` can then use `localhost:3306` to connect:
  ```properties
  spring.datasource.url=jdbc:mysql://localhost:3306/ZPMS?useSSL=false&serverTimezone=UTC
  spring.datasource.username=root
  spring.datasource.password=root@123
  spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
  spring.jpa.hibernate.ddl-auto=update
  spring.jpa.show-sql=true
  
