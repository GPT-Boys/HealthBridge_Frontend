# =====================================================
# Scripts de ejecución
# =====================================================

# ===== setup.sh =====

#!/bin/bash

echo "🚀 Configurando HealthBridge Frontend..."

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Verificar Node.js
echo -e "${BLUE}Verificando Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js no está instalado${NC}"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Se requiere Node.js 18+${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node -v)${NC}"

# Instalar dependencias
echo -e "${BLUE}📦 Instalando dependencias...${NC}"
npm install

# Crear .env.development
if [ ! -f .env.development ]; then
    echo -e "${BLUE}⚙️  Creando archivo .env.development...${NC}"
    cat > .env.development << 'EOF'
# API Configuration
VITE_API_URL=http://localhost:3001
VITE_API_TIMEOUT=10000

# App Configuration
VITE_APP_NAME=HealthBridge
VITE_APP_VERSION=1.0.0

# Features
VITE_ENABLE_REGISTRATION=true
VITE_ENABLE_PASSWORD_RESET=true
EOF
    echo -e "${GREEN}✅ Archivo .env.development creado${NC}"
fi

# Crear .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules
.pnp
.pnp.js

# Testing
coverage

# Production
dist
dist-ssr
*.local

# Editor
.vscode
.idea
*.swp
*.swo

# Environment
.env
.env.*
.env.local
.env.*.local

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS
.DS_Store
Thumbs.db
EOF

echo -e "${GREEN}✅ Configuración completada${NC}"
echo ""
echo -e "${BLUE}📋 Próximos pasos:${NC}"
echo "1. Asegúrate de que el backend esté corriendo en http://localhost:3001"
echo "2. Ejecuta: npm run dev"
echo ""
echo -e "${GREEN}🎉 ¡Listo!${NC}"