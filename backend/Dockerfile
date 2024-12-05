# Step 1: Use the official Node.js image
FROM node:18-alpine

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the app source code
COPY . .

# Step 6: Expose port 5000 (or the port used by your backend)
EXPOSE 5000

# Step 7: Start the app
CMD ["npm", "start"]
