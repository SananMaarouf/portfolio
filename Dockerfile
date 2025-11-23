# syntax=docker/dockerfile:1.6
############################################
# deps stage: install node dependencies once
############################################
FROM node:20-alpine AS deps
WORKDIR /app

# Only copy manifest files to maximize layer cache reuse
COPY package.json package-lock.json* ./

# Use BuildKit cache mount to speed repeated installs
RUN --mount=type=cache,target=/root/.npm npm ci --legacy-peer-deps

############################################
# builder stage: copy source & build static site
############################################
FROM node:20-alpine AS builder
WORKDIR /app

# Build arguments for environment variables (baked into static output)
ARG PUBLIC_SANITY_PROJECT_ID
ARG PUBLIC_SANITY_DATASET
ARG PUBLIC_PAGE_TITLE
ARG PUBLIC_NAVBAR_TITLE
ARG PUBLIC_COPYRIGHT_HOLDER
ARG SANITY_STUDIO_STUDIO_HOST
ARG BUILD_COMMIT="unknown"
ARG BUILD_TIMESTAMP="unknown"

ENV PUBLIC_SANITY_PROJECT_ID=$PUBLIC_SANITY_PROJECT_ID \
	PUBLIC_SANITY_DATASET=$PUBLIC_SANITY_DATASET \
	PUBLIC_PAGE_TITLE=$PUBLIC_PAGE_TITLE \
	PUBLIC_NAVBAR_TITLE=$PUBLIC_NAVBAR_TITLE \
	PUBLIC_COPYRIGHT_HOLDER=$PUBLIC_COPYRIGHT_HOLDER \
	SANITY_STUDIO_STUDIO_HOST=$SANITY_STUDIO_STUDIO_HOST \
	BUILD_COMMIT=$BUILD_COMMIT \
	BUILD_TIMESTAMP=$BUILD_TIMESTAMP

# Bring in node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json* ./

# Copy remaining source (everything else)
COPY . .

# Build static site
RUN npm run build

############################################
# runtime stage: minimal nginx serving /dist
############################################
FROM nginx:alpine AS runtime
WORKDIR /usr/share/nginx/html

# Labels for traceability
LABEL org.opencontainers.image.source="https://github.com/SananMaarouf/portfolio" \
	  org.opencontainers.image.revision=$BUILD_COMMIT \
	  org.opencontainers.image.created=$BUILD_TIMESTAMP

# Copy built assets
COPY --from=builder /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
