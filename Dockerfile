###################
# BASE
###################

FROM node:lts-slim as base
RUN apt-get update -y
RUN apt-get install -y openssl
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app


###################
# DEVELOPMENT
###################

FROM base As development
COPY --chown=node:node package.json ./
COPY --chown=node:node pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY --chown=node:node . .
USER node

###################
# BUILD
###################

FROM base As build
COPY --chown=node:node package.json ./
COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node --from=development /app/node_modules ./node_modules
COPY --chown=node:node . .
COPY --chown=node:node prisma prisma
RUN npx prisma generate
RUN pnpm run build
ENV NODE_ENV production
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --ignore-scripts --frozen-lockfile
USER node

###################
# PRODUCTION
###################

FROM base As production
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build  /app/prisma ./prisma
CMD [ "node", "dist/main.js" ]
