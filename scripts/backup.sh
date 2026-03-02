#!/bin/bash

set -euo pipefail

BACKUP_DIR="./backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="kartify_backup_${TIMESTAMP}.sql"

echo "💾 Creating database backup..."

# Create backup directory if it doesn't exist
mkdir -p ${BACKUP_DIR}

# Get postgres pod
POD=$(kubectl get pods -n kartify -l app=kartify-postgres -o jsonpath='{.items[0].metadata.name}')

# Create backup
kubectl exec -n kartify ${POD} -- pg_dump -U kartify kartify > ${BACKUP_DIR}/${BACKUP_FILE}

echo "✅ Backup created: ${BACKUP_DIR}/${BACKUP_FILE}"
