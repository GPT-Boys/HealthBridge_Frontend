# frontend/build.sh
#!/bin/bash

echo "🏗️  Construyendo HealthBridge Frontend para producción..."

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado."
    exit 1
fi

# Limpiar build anterior
echo "🧹 Limpiando build anterior..."
rm -rf dist

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm ci --silent

# Verificar variables de entorno para producción
if [ ! -f ".env.production" ]; then
    echo "⚙️  Creando archivo .env.production..."
    cat > .env.production << EOL
# HealthBridge Production Environment Variables

# API Configuration (actualizar con URLs de producción)
VITE_API_URL=https://api.healthbridge.bo/api
VITE_WS_URL=wss://api.healthbridge.bo

# App Configuration
VITE_APP_NAME=HealthBridge
VITE_APP_VERSION=1.0.0
VITE_APP_DESCRIPTION=Sistema de Gestión Médica

# Features
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_REALTIME=true
VITE_ENABLE_ANALYTICS=true

# Production
VITE_DEBUG_MODE=false
EOL
fi

# Construir para producción
echo "🔨 Construyendo aplicación..."
npm run build

# Verificar que el build fue exitoso
if [ -d "dist" ]; then
    echo "✅ Build completado exitosamente!"
    echo ""
    echo "📊 Estadísticas del build:"
    du -sh dist
    echo ""
    echo "📁 Contenido del directorio dist:"
    ls -la dist/
    echo ""
    echo "🚀 Listo para despliegue!"
    echo "   El contenido de la carpeta 'dist' puede ser subido a Vercel"
else
    echo "❌ Error en el build!"
    exit 1
fi