# frontend/start-dev.sh
#!/bin/bash

echo "🚀 Iniciando HealthBridge Frontend en modo desarrollo..."

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js 18+ desde https://nodejs.org/"
    exit 1
fi

# Verificar versión de Node.js
node_version=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$node_version" -lt 18 ]; then
    echo "❌ Se requiere Node.js 18 o superior. Versión actual: $(node -v)"
    exit 1
fi

# Verificar si el backend está corriendo
echo "🔍 Verificando conexión con el backend..."
if ! curl -s http://localhost:3000/health > /dev/null 2>&1; then
    echo "⚠️  El backend no parece estar corriendo en el puerto 3000"
    echo "   Por favor, inicia el backend primero ejecutando:"
    echo "   cd ../backend && ./start-dev.sh"
    echo ""
    read -p "¿Continuar de todas formas? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Instalar dependencias si no existen
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Verificar si hay actualizaciones de dependencias
echo "🔄 Verificando actualizaciones..."
npm update --no-fund --no-audit

# Crear archivo .env si no existe
if [ ! -f ".env" ]; then
    echo "⚙️  Creando archivo .env..."
    cat > .env << EOL
# HealthBridge Frontend Environment Variables

# API Configuration
VITE_API_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3000

# App Configuration
VITE_APP_NAME=HealthBridge
VITE_APP_VERSION=1.0.0
VITE_APP_DESCRIPTION=Sistema de Gestión Médica

# Features
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_REALTIME=true
VITE_ENABLE_ANALYTICS=false

# Development
VITE_DEBUG_MODE=true
EOL
    echo "✅ Archivo .env creado"
fi

# Limpiar cache si es necesario
if [ "$1" = "--clean" ]; then
    echo "🧹 Limpiando cache..."
    rm -rf node_modules package-lock.json
    npm install
fi

echo "🎨 Iniciando servidor de desarrollo..."
echo ""
echo "📋 Información del servidor:"
echo "   🌐 Frontend URL: http://localhost:5173"
echo "   🔗 API URL: http://localhost:3000"
echo "   📱 Red local disponible"
echo ""
echo "💡 Comandos útiles:"
echo "   Ctrl+C: Detener servidor"
echo "   Ctrl+R: Recargar página"
echo "   F12: Abrir herramientas de desarrollador"
echo ""

# Iniciar el servidor de desarrollo
npm run dev