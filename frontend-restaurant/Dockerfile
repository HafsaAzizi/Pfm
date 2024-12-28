# Étape 1 : Utiliser l'image officielle Node.js pour la construction
FROM node:18 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier le package.json et le package-lock.json (si présent) pour installer les dépendances
COPY package*.json ./

# Installer les dépendances (y compris avec --legacy-peer-deps si nécessaire pour éviter les conflits)
RUN npm install --legacy-peer-deps

# Copier les autres fichiers du projet dans le conteneur
COPY . .

# Construire l'application Angular en mode production
RUN npm run build -- --project restaurante --configuration production

# Étape 2 : Utiliser Nginx pour servir l'application construite
FROM nginx:alpine

# Copier les fichiers construits dans le répertoire de Nginx
COPY --from=build /app/dist/restaurante /usr/share/nginx/html

# Exposer le port 80 pour accéder à l'application
EXPOSE 80

# Démarrer Nginx pour servir l'application
CMD ["nginx", "-g", "daemon off;"]
