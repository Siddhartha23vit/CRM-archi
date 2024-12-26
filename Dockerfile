# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.8.1

FROM node:${NODE_VERSION}-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to leverage Docker caching
COPY package.json package-lock.json ./

# Install dependencies in development mode to include dev dependencies
ENV NODE_ENV=development
RUN npm install

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy the rest of the source files into the image
COPY . .

# Adjust permissions for the cache directory
RUN mkdir -p /usr/src/app/.angular/cache && chown -R node:node /usr/src/app/.angular

# Run the application as a non-root user
USER node

# Expose the port that the application listens on
EXPOSE 5000

# Run the application
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
