FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

FROM node:22-alpine AS production

ENV NODE_ENV=production
WORKDIR /app

COPY --from=build /app/.output /app

CMD ["node", "/app/server/index.mjs"]