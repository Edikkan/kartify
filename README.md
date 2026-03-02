# 🛒 Kartify - Modern E-Commerce Platform

A production-ready, full-stack e-commerce application built with Next.js, Node.js, PostgreSQL, and Redis. Deployed on Kubernetes with GitOps (ArgoCD).

## 🚀 Features

- **User Features:**
  - User authentication (JWT)
  - Product browsing & search
  - Shopping cart
  - Checkout & orders
  - Order tracking
  - User profile management
  - Product reviews

- **Admin Features:**
  - Dashboard with analytics
  - Product management (CRUD)
  - Order management
  - User management
  - Category management
  - Sales reports

- **Technical Features:**
  - RESTful API
  - PostgreSQL database
  - Redis caching
  - Docker containers
  - Kubernetes deployment
  - GitOps with ArgoCD
  - Monitoring (Prometheus/Grafana)
  - Automated backups

## 🏗️ Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Next.js   │────▶│  Node.js    │────▶│ PostgreSQL  │
│   Frontend  │     │    API      │     │  Database   │
└─────────────┘     ─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │    Redis    │
                    │    Cache    │
                    └─────────────┘
```

## 📦 Quick Start

### Local Development

```bash
# Clone repository
git clone https://github.com/edikkan/kartify.git
cd kartify

# Start all services
docker-compose up -d

# Access application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
# Admin: http://localhost:3000/admin
```

### Kubernetes Deployment

```bash
# Apply Kubernetes manifests
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/

# Or use Helm
helm install kartify ./helm/kartify -n kartify

# Or use ArgoCD
kubectl apply -f argocd/application.yaml
```

## 🔐 Default Credentials

**Admin User:**
- Email: admin@kartify.com
- Password: Admin123!

**Test User:**
- Email: user@kartify.com
- Password: User123!

## 📊 Monitoring

- **Grafana:** https://grafana.yourdomain.com
- **Prometheus:** https://prometheus.yourdomain.com
- **Application Metrics:** https://kartify.yourdomain.com/metrics

## 🛡️ Security

- JWT authentication
- Password hashing (bcrypt)
- Rate limiting
- Input validation
- SQL injection prevention
- XSS protection
- CORS configuration

## 📝 API Documentation

Available at: https://api.kartify.yourdomain.com/api-docs

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 📞 Support

Email: support@kartify.com
