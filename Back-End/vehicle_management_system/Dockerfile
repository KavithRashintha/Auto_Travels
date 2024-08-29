FROM openjdk:21-jdk-alpine

WORKDIR /app

COPY target/vehicle_management_system-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
