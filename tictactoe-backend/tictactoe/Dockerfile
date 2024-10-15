FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY target/tictactoe-0.0.1-SNAPSHOT.jar /app/tictactoe-0.0.1-SNAPSHOT.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar","tictactoe-0.0.1-SNAPSHOT.jar"]