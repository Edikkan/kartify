#!/bin/bash

set -euo pipefail

echo "🚀 Deploying Kartify to Kubernetes..."

# Build and push images
echo "📦 Building Docker images..."
docker build -t your-registry/kartify-frontend:latest ./frontend
docker build -t your-registry/kartify-backend:latest ./backend

echo "📤 Pushing images to registry..."
docker push your-registry/kartify-frontend:latest
docker push your-registry/kartify-backend:latest

# Apply Kubernetes manifests
echo "☸️  Applying Kubernetes manifests..."
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/

# Wait for deployment
echo "⏳ Waiting for deployment to complete..."
kubectl rollout status deployment/kartify-backend -n kartify
kubectl rollout status deployment/kartify-frontend -n kartify

echo "✅ Deployment complete!"
echo ""
echo "📍 Access your application:"
echo "   Frontend: https://kartify.yourdomain.com"
echo "   API: https://api.kartify.yourdomain.com"
echo "   Admin: https://kartify.yourdomain.com/admin"
