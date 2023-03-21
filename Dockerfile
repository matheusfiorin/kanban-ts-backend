# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the project to the working directory
COPY . .

# Build the project
RUN npm run build

# Expose port 666 for the app
EXPOSE 666

# Start the app
CMD [ "npm", "start" ]
