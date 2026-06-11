#!/bin/bash

# Moodly - Automated Project Setup (Laravel Sail Version)

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Starting Moodly Setup ===${NC}"

# 1. Docker Check
echo -e "\n${BLUE}[1/7] Checking Docker status...${NC}"
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}Error: Docker is not running.${NC}"
    echo -e "Please start Docker Desktop and try running this script again."
    exit 1
fi
echo -e "${GREEN}Docker is running.${NC}"

# 2. Initial Dependencies
echo -e "\n${BLUE}[2/7] Installing PHP dependencies via Composer...${NC}"
# Mengabaikan platform reqs karena PHP asli akan berjalan di dalam Docker (Sail)
composer install --ignore-platform-reqs
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Composer install failed.${NC}"
    exit 1
fi

# 3. Environment Setup
echo -e "\n${BLUE}[3/7] Setting up environment file...${NC}"
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${GREEN}.env file created from .env.example.${NC}"
else
    echo -e "Existing .env file found. Skipping copy."
fi

# 3.1 Sail Configuration (Generate docker-compose.yml)
if [ ! -f docker-compose.yml ]; then
    echo -e "\n${BLUE}[3.1/7] Generating Laravel Sail configuration (docker-compose.yml)...${NC}"
    # Gunakan --no-interaction agar script tidak berhenti meminta pilihan
    php artisan sail:install --with=pgsql --no-interaction
fi

# 4. Enforce PostgreSQL (Sail Configuration)
echo -e "\n${BLUE}[4/7] Configuring PostgreSQL for Laravel Sail...${NC}"
# Use sed to update .env for Sail defaults
sed -i 's/^DB_CONNECTION=.*/DB_CONNECTION=pgsql/' .env
sed -i 's/^DB_HOST=.*/DB_HOST=pgsql/' .env
sed -i 's/^DB_PORT=.*/DB_PORT=5432/' .env
sed -i 's/^DB_DATABASE=.*/DB_DATABASE=moodly/' .env
sed -i 's/^DB_USERNAME=.*/DB_USERNAME=sail/' .env
sed -i 's/^DB_PASSWORD=.*/DB_PASSWORD=password/' .env

# Pastikan variabel tidak ada yang di-comment
sed -i 's/^# DB_DATABASE=/DB_DATABASE=/g' .env
sed -i 's/^# DB_USERNAME=/DB_USERNAME=/g' .env
sed -i 's/^# DB_PASSWORD=/DB_PASSWORD=/g' .env

echo -e "${GREEN}Environment configured for PostgreSQL via Sail.${NC}"

# 5. Start Laravel Sail
echo -e "\n${BLUE}[5/7] Starting Docker containers (Laravel Sail)...${NC}"
# Pastikan container lama mati dan volume bersih jika ini setup ulang untuk menghindari stale password
./vendor/bin/sail down -v > /dev/null 2>&1
./vendor/bin/sail up -d

echo -e "${BLUE}Waiting for database to be ready (15s)...${NC}"
sleep 15

# 6. Database Initialization (Migrate & Seed)
echo -e "\n${BLUE}[6/7] Initializing database (Migrate & Seed)...${NC}"
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate:fresh --seed
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Database migration and seeding failed.${NC}"
    exit 1
fi
echo -e "${GREEN}Database is ready and seeded.${NC}"

# 7. Frontend Setup
echo -e "\n${BLUE}[7/7] Setting up frontend dependencies...${NC}"
./vendor/bin/sail npm install
./vendor/bin/sail npm run build
echo -e "${GREEN}Frontend dependencies installed and assets built.${NC}"

echo -e "\n${GREEN}=== Setup Berhasil! ===${NC}"
echo -e "Script akan otomatis menjalankan server pengembangan sekarang."
echo -e "\n${BLUE}PENTING:${NC}"
echo -e "Silakan buka browser dan akses alamat ini untuk melihat website:"
echo -e "${GREEN}http://localhost${NC}"
echo -e "(Klik link di atas atau copy-paste ke browser Anda)\n"

# Menjalankan perintah ke-3 secara otomatis
./vendor/bin/sail npm run dev
