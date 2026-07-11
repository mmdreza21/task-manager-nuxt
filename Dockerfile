FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY package*.json ./
COPY .env* ./

RUN npm ci --omit=dev

COPY --from=builder /app/.output ./.output
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]