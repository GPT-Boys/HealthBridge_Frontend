# ===== test-frontend.sh =====

#!/bin/bash

echo "🧪 Probando HealthBridge Frontend..."

API_URL="http://localhost:5173"

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Verificar que el frontend está corriendo
echo -e "${BLUE}Verificando frontend en ${API_URL}...${NC}"

response=$(curl -s -o /dev/null -w "%{http_code}" ${API_URL})

if [ "$response" -eq 200 ]; then
    echo -e "${GREEN}✅ Frontend está corriendo${NC}"
    echo ""
    echo "🌐 Abre tu navegador en: ${API_URL}"
    echo ""
    echo "📋 Rutas disponibles:"
    echo "   ${API_URL}/auth/login"
    echo "   ${API_URL}/auth/register"
    echo "   ${API_URL}/auth/forgot-password"
    echo "   ${API_URL}/dashboard (requiere autenticación)"
else
    echo -e "${RED}❌ Frontend no está corriendo${NC}"
    echo "Ejecuta: npm run dev"
    exit 1
fi