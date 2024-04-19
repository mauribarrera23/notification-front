FROM node:14

WORKDIR /app

COPY . .

RUN npm install --frozen-lockfile --non-interactive --production=false --ignore-scripts

EXPOSE 3000

CMD ["npm", "start"]
