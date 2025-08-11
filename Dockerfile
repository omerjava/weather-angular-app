# Stage 1: Build the Angular app
FROM node:24 AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies first (better cache)
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build Angular app in production mode
RUN npm run build -- --configuration=production

# Stage 2: Serve the app with nginx
FROM nginx:alpine

# Copy built files from build stage
COPY --from=build /app/dist/weather-angular-app /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
