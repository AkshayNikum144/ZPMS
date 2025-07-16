# Stage 1: Build the application
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app

# Copy only pom.xml first to leverage Docker cache
COPY pom.xml . 
RUN mvn dependency:go-offline

# Now copy the rest of the source code
COPY src ./src

# Package the application without running tests
RUN mvn clean package -DskipTests

# Stage 2: Create the runtime image
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy the JAR file from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the default Spring Boot port
EXPOSE 8080

# Run the app
CMD ["java", "-jar", "app.jar"]
