# ---- Stage 1: Build ----
# Use node to install dependencies and build the Angular app
# This stage is temporary — it won't exist in the final image
FROM node:20-slim AS builder

WORKDIR /app

# Same caching trick as the backend —
# copy package files first so npm install is cached
COPY package*.json ./

RUN npm ci

# Copy source code and build
COPY . .

RUN npx ng build --configuration=production

# ---- Stage 2: Serve ----
# Only this stage ends up in the final image
# nginx is a lightweight web server — perfect for serving static files
FROM nginx:alpine

# Copy the Angular build output from Stage 1 into nginx's serving directory
# /app/dist/azul/browser is where ng build puts the static files
# COPY --from=builder /app/dist/azul/browser /usr/share/nginx/html
COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html

# nginx serves on port 80 by default
EXPOSE 80

# nginx starts automatically — no CMD needed
