# 빌드 단계
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# 실행 단계
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
