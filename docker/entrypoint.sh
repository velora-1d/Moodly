#!/bin/sh
set -e

cd /var/www/html

echo "=== Memulai Moodly Deployment ==="

# Cek APP_KEY
if [ -z "$APP_KEY" ]; then
    echo "ERROR: APP_KEY belum diset! Generating..."
    php artisan key:generate --force
else
    echo "APP_KEY sudah diset."
fi

# Buat file .env dari SEMUA environment variables
# Cara ini lebih aman daripada echo satu-satu
env | grep -v '^_' | grep -v '^HOME' | grep -v '^PATH' | grep -v '^HOSTNAME' | grep -v '^SHLVL' | grep -v '^PWD' > .env.runtime 2>/dev/null || true

# Bangun .env secara eksplisit untuk kontrol penuh
cat > .env <<EOF
APP_NAME=${APP_NAME:-Moodly}
APP_ENV=${APP_ENV:-production}
APP_KEY=${APP_KEY}
APP_DEBUG=${APP_DEBUG:-false}
APP_URL=${APP_URL:-https://moodly.mindway.my.id}

LOG_CHANNEL=${LOG_CHANNEL:-stderr}
LOG_LEVEL=${LOG_LEVEL:-error}

DB_CONNECTION=${DB_CONNECTION:-mysql}
DB_HOST=${DB_HOST:-127.0.0.1}
DB_PORT=${DB_PORT:-3306}
DB_DATABASE=${DB_DATABASE:-railway}
DB_USERNAME=${DB_USERNAME:-root}
DB_PASSWORD=${DB_PASSWORD}

SESSION_DRIVER=${SESSION_DRIVER:-database}
SESSION_LIFETIME=${SESSION_LIFETIME:-120}
SESSION_ENCRYPT=${SESSION_ENCRYPT:-false}
SESSION_PATH=${SESSION_PATH:-/}
SESSION_DOMAIN=${SESSION_DOMAIN:-null}

BROADCAST_CONNECTION=${BROADCAST_CONNECTION:-log}
FILESYSTEM_DISK=${FILESYSTEM_DISK:-local}
CACHE_STORE=${CACHE_STORE:-database}
QUEUE_CONNECTION=${QUEUE_CONNECTION:-database}

AI_API_KEY=${AI_API_KEY}
AI_BASE_URL=${AI_BASE_URL:-https://ai.sumopod.com/v1}
AI_MODEL=${AI_MODEL:-gpt-4o}

VITE_APP_NAME=${APP_NAME:-Moodly}
EOF

echo "=== .env berhasil dibuat ==="
cat .env | head -5
echo "..."

# Set permission
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

# Clear cache lama
php artisan config:clear 2>/dev/null || true
php artisan route:clear 2>/dev/null || true
php artisan view:clear 2>/dev/null || true

# Optimasi cache Laravel untuk production
php artisan config:cache 2>/dev/null || echo "Config cache gagal, lanjut..."
php artisan route:cache 2>/dev/null || echo "Route cache gagal, lanjut..."
php artisan view:cache 2>/dev/null || echo "View cache gagal, lanjut..."

# --- DYNAMIC PORT CONFIGURATION ---
# Railway menyuntikkan $PORT secara dinamis, pastikan Nginx menggunakan $PORT
PORT="${PORT:-8080}"
sed -i "s/__PORT__/${PORT}/g" /etc/nginx/http.d/default.conf

# Jalankan migrasi database
echo "=== Menjalankan migrasi ==="
php artisan migrate --force 2>&1 || echo "Migration skipped atau gagal"

echo "=== Moodly siap dijalankan di port ${PORT} ==="

# Jalankan supervisor (nginx + php-fpm)
exec /usr/bin/supervisord -c /etc/supervisord.conf
