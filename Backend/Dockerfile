# Use buildx-compatible syntax
FROM --platform=$TARGETPLATFORM eclipse-temurin:latest

# Set working directory
WORKDIR /app

# Copy Maven files
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Make mvnw executable
RUN chmod +x mvnw

# Copy source code
COPY src src

# Build the application
RUN ./mvnw package -DskipTests

# Expose port
EXPOSE 8080

# Run the application
# CMD ["java", "-jar", "target/*.jar"]
CMD ["java", "-jar", "target/cotizacionesce-0.0.1-SNAPSHOT.jar"]