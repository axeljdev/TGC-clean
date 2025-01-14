FROM node:20-alpine3.21

WORKDIR /app

# Installer les dépendances nécessaires pour la compilation
RUN apk add --no-cache python3 make g++

COPY package.json package.json
# needed to get exactly the same packages versions as the host machine
COPY package-lock.json package-lock.json
RUN npm install

# do not use this because it copies node_modules and may cause some incohrence between operating systems
# COPY . .

COPY tsconfig.json tsconfig.json
COPY src src

EXPOSE 5500

CMD ["npm", "start"]