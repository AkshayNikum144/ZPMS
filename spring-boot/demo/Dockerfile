# Use OpenJDK 17 image
FROM openjdk:17-jdk-slim

# Set working directory in container
WORKDIR /app

# Copy everything to the container
COPY . .

# Make mvnw executable and build the project
RUN chmod +x mvnw && ./mvnw clean install

# Expose port 8080 (default for Spring Boot)
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "target/demo-0.0.1-SNAPSHOT.jar"]