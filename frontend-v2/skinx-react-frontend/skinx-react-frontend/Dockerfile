# Use an official Node.js image as the base for the build stage
FROM node:22-bullseye-slim AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight Node.js image for the production environment
FROM node:22-bullseye-slim

# Set the working directory inside the container
WORKDIR /app

# Install serve to run the production server
RUN npm install -g serve

# Copy the build output from the build stage to the final image
COPY --from=build /app/build ./build

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the app using serve
CMD ["serve", "-s", "build"]
