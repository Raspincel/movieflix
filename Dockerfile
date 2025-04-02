# Dockerfile combinada para dev e prod

# Estágio 1: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Argumentos de Build-time (somente para produção)
ARG VITE_TMDB_TOKEN
ARG VITE_TMDB_API_KEY

COPY package*.json ./
RUN npm install

COPY . .

# Comando de build para produção
RUN if [ "$ENV" = "prod" ]; then \
      npm run build; \
    fi

# Estágio 2: Produção com nginx
FROM nginx:alpine AS prod
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Estágio 3: Desenvolvimento
FROM node:20-alpine AS dev
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]