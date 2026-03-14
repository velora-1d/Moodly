# ============================================
# Stage 1: Build asset frontend (Vite + React)
# ============================================
FROM node:20-alpine AS node-builder

WORKDIR /app

# Salin file dependency terlebih dahulu agar cache Docker lebih efisien
COPY package.json package-lock.json ./
RUN npm ci

# Salin semua source code & build
COPY . .
RUN npm run build

# ============================================
# Stage 2: PHP runtime (Laravel)
# ============================================
FROM php:8.2-fpm-alpine AS php-runtime

# Install dependensi sistem yang diperlukan Laravel
RUN apk add --no-cache \
    nginx \
    supervisor \
    curl \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libzip-dev \
    icu-dev \
    oniguruma-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
        pdo_mysql \
        gd \
        zip \
        intl \
        mbstring \
        bcmath \
        opcache \
    && rm -rf /var/cache/apk/*

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Salin file Composer terlebih dahulu
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-scripts --no-interaction

# Salin source code
COPY . .

# Salin asset yang sudah di-build dari stage 1
COPY --from=node-builder /app/public/build ./public/build

# Jalankan post-install scripts Composer
RUN composer dump-autoload --optimize \
    && php artisan package:discover --ansi || true

# Buat direktori yang diperlukan & set permission
RUN mkdir -p storage/logs storage/framework/sessions storage/framework/views storage/framework/cache/data bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Salin konfigurasi PHP
COPY docker/php.ini /usr/local/etc/php/conf.d/99-custom.ini
COPY docker/php-fpm.conf /usr/local/etc/php-fpm.d/www.conf

# Salin konfigurasi nginx — hapus default dulu
RUN rm -f /etc/nginx/http.d/default.conf
COPY docker/nginx.conf /etc/nginx/http.d/default.conf

# Salin konfigurasi supervisor
COPY docker/supervisord.conf /etc/supervisord.conf

# Salin entrypoint script
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose port (Railway akan set PORT otomatis)
EXPOSE 8080

ENTRYPOINT ["/entrypoint.sh"]
