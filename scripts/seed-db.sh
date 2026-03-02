#!/bin/bash

echo "🌱 Seeding database..."

# Get postgres pod
POD=$(kubectl get pods -n kartify -l app=kartify-postgres -o jsonpath='{.items[0].metadata.name}')

# Copy seed files
kubectl cp database/seeds/categories.sql kartify/${POD}:/tmp/categories.sql
kubectl cp database/seeds/products.sql kartify/${POD}:/tmp/products.sql
kubectl cp database/seeds/users.sql kartify/${POD}:/tmp/users.sql

# Run seeds
kubectl exec -n kartify ${POD} -- psql -U kartify -d kartify -f /tmp/categories.sql
kubectl exec -n kartify ${POD} -- psql -U kartify -d kartify -f /tmp/products.sql
kubectl exec -n kartify ${POD} -- psql -U kartify -d kartify -f /tmp/users.sql

echo "✅ Database seeded successfully!"
