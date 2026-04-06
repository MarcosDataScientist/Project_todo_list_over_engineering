FROM node:20-slim

WORKDIR /app

# Copy dependency manifests
COPY package.json yarn.lock* ./

# Install dependencies with yarn
RUN yarn install --frozen-lockfile || yarn install

# Copy application code
COPY . .

# Expose Docusaurus dev port
EXPOSE 3000

# Run generation and start dev server
CMD ["sh", "-c", "yarn docusaurus gen-api-docs all && yarn start --host 0.0.0.0 --port 3000 --poll 1000"]
