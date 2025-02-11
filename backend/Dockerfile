FROM node:22

# RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

WORKDIR /app

COPY package.json ./

# USER node

# RUN yarn install --pure-lockfile

# COPY --chown=node:node . .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]