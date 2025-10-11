# ===== build.sh =====

#!/bin/bash

echo "🏗️  Construyendo HealthBridge Frontend..."

# Type checking
echo "🔍 Verificando tipos TypeScript..."
npm run type-check

if [ $? -ne 0 ]; then
    echo "❌ Error en verificación de tipos"
    exit 1
fi

# Build
echo "🔨 Construyendo aplicación..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error en build"
    exit 1
fi

echo "✅ Build exitoso!"
echo ""
echo "📊 Estadísticas:"
du -sh dist
echo ""
echo "📁 Archivos generados en: dist/"
echo ""
echo "🚀 Para probar el build:"
echo "   npm run preview"