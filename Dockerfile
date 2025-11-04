# Dockerfile (간소화)

FROM node:20-alpine
WORKDIR /app

# 이전 ARG/ENV 설정 제거

COPY package*.json ./

# 의존성 설치 (버전 충돌을 legacy-peer-deps 옵션으로 무시하고 설치)
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]