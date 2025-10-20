#!/bin/bash

# HealthBridge Frontend Docker Management Script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to show usage
show_usage() {
    echo "Usage: $0 {dev|prod|build|clean|logs|stop}"
    echo ""
    echo "Commands:"
    echo "  dev     - Start development environment"
    echo "  prod    - Start production environment"
    echo "  build   - Build production image"
    echo "  clean   - Clean up containers and images"
    echo "  logs    - Show logs"
    echo "  stop    - Stop all services"
    echo ""
}

# Function to start development environment
start_dev() {
    print_status "Starting development environment..."
    docker-compose --profile dev up -d
    print_success "Development environment started!"
    print_status "Frontend available at: http://localhost:5173"
    print_status "Backend available at: http://localhost:3000"
}

# Function to start production environment
start_prod() {
    print_status "Starting production environment..."
    docker-compose --profile prod up -d
    print_success "Production environment started!"
    print_status "Application available at: http://localhost:80"
}

# Function to build production image
build_prod() {
    print_status "Building production image..."
    docker-compose --profile prod build
    print_success "Production image built successfully!"
}

# Function to clean up
clean_up() {
    print_status "Cleaning up containers and images..."
    docker-compose down --volumes --remove-orphans
    docker system prune -f
    print_success "Cleanup completed!"
}

# Function to show logs
show_logs() {
    print_status "Showing logs..."
    docker-compose logs -f
}

# Function to stop services
stop_services() {
    print_status "Stopping all services..."
    docker-compose down
    print_success "All services stopped!"
}

# Main script logic
case "$1" in
    dev)
        start_dev
        ;;
    prod)
        start_prod
        ;;
    build)
        build_prod
        ;;
    clean)
        clean_up
        ;;
    logs)
        show_logs
        ;;
    stop)
        stop_services
        ;;
    *)
        print_error "Invalid command: $1"
        show_usage
        exit 1
        ;;
esac
