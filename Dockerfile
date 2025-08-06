# Stage 1: Build the Angular app
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --configuration=production

# Stage 2: Serve the app with nginx
FROM nginx:alpine
COPY --from=build /app/dist/weather-angular-app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
