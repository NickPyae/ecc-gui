# Builder
FROM node:10-alpine as builder
RUN npm config set registry https://amaas-eos-drm1.cec.lab.emc.com/artifactory/api/npm/DDSp/
RUN npm set strict-ssl false
RUN npm install --save @dell/dds
COPY package.json package-lock.json ./
RUN npm install --only=prod&& mkdir /react-frontend && mv ./node_modules ./react-frontend
WORKDIR /react-frontend
COPY . .
RUN npm run build

# Production Build
FROM nginx:1.16.0-alpine
COPY --from=builder /react-frontend/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
VOLUME /etc/nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
