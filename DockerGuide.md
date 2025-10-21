# HealthBridge Frontend - Docker Setup Guide

## Prerequisites

- Docker Desktop installed and running
- Docker Compose v2.0+
- Node.js 22+ (for local development)

## Quick Start

### Development Environment

```bash
# Start development environment
./docker-manage.sh dev

# Or manually
docker-compose --profile dev up -d
```

The development server will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### Production Environment

```bash
# Build and start production environment
./docker-manage.sh prod

# Or manually
docker-compose --profile prod up -d
```

The production application will be available at:

- Application: http://localhost:80

## Available Commands

### Using the Management Script

```bash
# Development
./docker-manage.sh dev

# Production
./docker-manage.sh prod

# Build production image
./docker-manage.sh build

# View logs
./docker-manage.sh logs

# Stop all services
./docker-manage.sh stop

# Clean up everything
./docker-manage.sh clean
```

### Manual Docker Commands

```bash
# Development
docker-compose --profile dev up -d

# Production
docker-compose --profile prod up -d

# Build only
docker-compose --profile prod build

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Clean up
docker-compose down --volumes --remove-orphans
```

## Services Overview

### Frontend Services

- **frontend-dev**: Development server with hot reload
- **frontend-prod**: Production build served by Nginx

### Backend Services (Placeholder)

- **backend**: Node.js API server
- **database**: PostgreSQL database
- **redis**: Redis cache/session store

## Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# Frontend
NODE_ENV=development
VITE_API_URL=http://localhost:3000

# Backend
PORT=3000
DATABASE_URL=postgresql://healthbridge_user:healthbridge_password@database:5432/healthbridge
REDIS_URL=redis://redis:6379
```

### Nginx Configuration

The production build uses a custom Nginx configuration (`nginx.conf`) that includes:

- Client-side routing support
- Static asset caching
- Gzip compression
- Security headers
- API proxy configuration

## Development Workflow

1. **Start development environment**:

   ```bash
   ./docker-manage.sh dev
   ```

2. **Make changes** to your code (hot reload enabled)

3. **View logs** if needed:

   ```bash
   ./docker-manage.sh logs
   ```

4. **Stop when done**:
   ```bash
   ./docker-manage.sh stop
   ```

## Production Deployment

1. **Build production image**:

   ```bash
   ./docker-manage.sh build
   ```

2. **Start production environment**:

   ```bash
   ./docker-manage.sh prod
   ```

3. **Verify deployment**:
   - Visit http://localhost:80
   - Check health endpoint: http://localhost:80/health

## Troubleshooting

### Common Issues

1. **Port conflicts**: Make sure ports 80, 3000, 5173, 5432, and 6379 are available

2. **Permission issues**: On Linux/macOS, you might need to make the script executable:

   ```bash
   chmod +x docker-manage.sh
   ```

3. **Build failures**: Clean up and rebuild:
   ```bash
   ./docker-manage.sh clean
   ./docker-manage.sh build
   ```

### Useful Commands

```bash
# Check running containers
docker ps

# Check logs for specific service
docker-compose logs frontend-dev

# Execute commands in running container
docker-compose exec frontend-dev sh

# Check resource usage
docker stats
```

## File Structure

```
.
├── Dockerfile              # Multi-stage Docker build
├── docker-compose.yml      # Service orchestration
├── nginx.conf             # Nginx configuration
├── .dockerignore          # Docker ignore file
├── docker-manage.sh       # Management script
└── DockerGuide.md         # This guide
```

## Next Steps

1. Customize the backend service configuration in `docker-compose.yml`
2. Add your actual backend repository path
3. Configure environment variables for your specific setup
4. Set up CI/CD pipeline for automated deployments
5. Add monitoring and logging solutions
