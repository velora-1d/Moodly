#!/bin/sh
set -e

cd /var/www/html

# Generate APP_KEY jika belum ada
if [ -z "$APP_KEY" ]; then
    echo "WARNING: APP_KEY belum diset! Pastikan diset di Railway Dashboard."
fi

# Buat file .env dari environment variables
echo "APP_NAME=${APP_NAME:-Moodly}" > .env
echo "APP_ENV=${APP_ENV:-production}" >> .env
echo "APP_KEY=${APP_KEY}" >> .env
echo "APP_DEBUG=${APP_DEBUG:-false}" >> .env
echo "APP_URL=${APP_URL:-http://localhost}" >> .env
echo "" >> .env
echo "DB_CONNECTION=${DB_CONNECTION:-mysql}" >> .env
echo "DB_HOST=${DB_HOST:-127.0.0.1}" >> .env
echo "DB_PORT=${DB_PORT:-3306}" >> .env
echo "DB_DATABASE=${DB_DATABASE:-railway}" >> .env
echo "DB_USERNAME=${DB_USERNAME:-root}" >> .env
echo "DB_PASSWORD=${DB_PASSWORD}" >> .env
echo "" >> .env
echo "SESSION_DRIVER=${SESSION_DRIVER:-database}" >> .env
echo "SESSION_LIFETIME=${SESSION_LIFETIME:-120}" >> .env
echo "CACHE_STORE=${CACHE_STORE:-database}" >> .env
echo "QUEUE_CONNECTION=${QUEUE_CONNECTION:-database}" >> .env
echo "" >> .env
echo "AI_API_KEY=${AI_API_KEY}" >> .env
echo "AI_BASE_URL=${AI_BASE_URL:-https://ai.sumopod.com/v1}" >> .env
echo "AI_MODEL=${AI_MODEL:-gpt-4o}" >> .env

# Optimasi cache Laravel untuk production
php artisan config:cache || true
php artisan route:cache || true
php artisan view:cache || true

# Jalankan migrasi database (aman karena --force)
php artisan migrate --force || echo "Migration skipped or failed"

# Set permission ulang
chown -R www-data:www-data storage bootstrap/cache

echo "=== Moodly siap dijalankan ==="

# Jalankan supervisor (nginx + php-fpm)
exec /usr/bin/supervisord -c /etc/supervisord.conf
