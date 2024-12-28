# Utiliser une image de base OpenJDK
FROM openjdk:23-jdk-slim

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier JAR dans l'image Docker
COPY target/restaurant-0.0.1-SNAPSHOT.jar /app/restaurant.jar

# Exposer le port 8080
EXPOSE 8080

# Commande pour exécuter l'application Java
ENTRYPOINT ["java", "-jar", "/app/restaurant.jar"]

