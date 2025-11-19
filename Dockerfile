# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Build arguments for environment variables
ARG PUBLIC_SANITY_PROJECT_ID
ARG PUBLIC_SANITY_DATASET
ARG PUBLIC_PAGE_TITLE
ARG PUBLIC_NAVBAR_TITLE
ARG PUBLIC_COPYRIGHT_HOLDER
ARG SANITY_STUDIO_STUDIO_HOST

# Set environment variables
ENV PUBLIC_SANITY_PROJECT_ID=$PUBLIC_SANITY_PROJECT_ID
ENV PUBLIC_SANITY_DATASET=$PUBLIC_SANITY_DATASET
ENV PUBLIC_PAGE_TITLE=$PUBLIC_PAGE_TITLE
ENV PUBLIC_NAVBAR_TITLE=$PUBLIC_NAVBAR_TITLE
ENV PUBLIC_COPYRIGHT_HOLDER=$PUBLIC_COPYRIGHT_HOLDER
ENV SANITY_STUDIO_STUDIO_HOST=$SANITY_STUDIO_STUDIO_HOST

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
# it fails without --legacy-peer-deps for some reason
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build the static site
RUN npm run build

# Production stage - serve with nginx
FROM nginx:alpine

# Copy the built static files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
