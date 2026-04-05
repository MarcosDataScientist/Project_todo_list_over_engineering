FROM node:20-slim

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose Docusaurus dev port
EXPOSE 3000

# Run dev server with host binding
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0", "--port", "3000", "--poll", "1000"]
