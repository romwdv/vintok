# === Stage 1: Build avec Node/Yarn/Vite ===
FROM node:22-alpine AS builder

WORKDIR /app

# Copie des fichiers de dépendances
COPY package.json yarn.lock ./

# Installation des dépendances (avec cache Yarn)
RUN yarn install --frozen-lockfile --prefer-offline

# Copie du reste du projet
COPY . .

# Build de l'app Vite
RUN yarn build

# === Stage 2: Serveur Nginx ===
FROM nginx:alpine

# Copie de la configuration Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie des fichiers build (depuis le stage builder)
COPY --from=builder /app/dist /usr/share/nginx/html

# Port par défaut
EXPOSE 80

# Démarrage de Nginx
CMD ["nginx", "-g", "daemon off;"]