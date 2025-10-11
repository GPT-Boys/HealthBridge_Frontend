# ===== start-dev.sh =====

#!/bin/bash

echo "🎨 Iniciando HealthBridge Frontend..."

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Verificar .env.development
if [ ! -f .env.development ]; then
    echo -e "${RED}❌ Archivo .env.development no encontrado${NC}"
    echo "Ejecuta: ./setup.sh"
    exit 1
fi

# Verificar backend
echo -e "${BLUE}🔍 Verificando backend...${NC}"
if ! curl -s http://localhost:3001/health > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Backend no está corriendo en localhost:3001${NC}"
    echo ""
    read -p "¿Continuar de todas formas? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo -e "${GREEN}✅ Backend está corriendo${NC}"
fi

# Verificar dependencias
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}📦 Instalando dependencias...${NC}"
    npm install
fi

echo ""
echo -e "${GREEN}✅ Iniciando servidor de desarrollo...${NC}"
echo ""
echo "📋 Información:"
echo "   🌐 Frontend: http://localhost:5173"
echo "   🔗 API: http://localhost:3001"
echo ""
echo "💡 Presiona Ctrl+C para detener"
echo ""

# Iniciar Vite
npm run dev