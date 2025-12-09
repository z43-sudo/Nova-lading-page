@echo off
echo ========================================
echo  AgroInteligente - Stripe Integration
echo  Instalador de Dependencias
echo ========================================
echo.

echo [1/2] Instalando dependencias do Frontend...
call npm install
if %errorlevel% neq 0 (
    echo ERRO: Falha ao instalar dependencias do frontend
    pause
    exit /b 1
)
echo.

echo [2/2] Instalando dependencias do Backend...
cd server
call npm install
if %errorlevel% neq 0 (
    echo ERRO: Falha ao instalar dependencias do backend
    cd ..
    pause
    exit /b 1
)
cd ..
echo.

echo ========================================
echo  Instalacao concluida com sucesso!
echo ========================================
echo.
echo Proximos passos:
echo 1. Configure o arquivo .env (use .env.example como referencia)
echo 2. Adicione suas chaves do Stripe
echo 3. Execute: npm run dev (frontend)
echo 4. Execute: cd server ^&^& npm run dev (backend)
echo.
echo Consulte STRIPE_CHECKLIST.md para mais detalhes
echo ========================================
pause
