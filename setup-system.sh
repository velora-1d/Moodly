#!/bin/bash

# Moodly - Script 1: System Prerequisites Installer

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}=== [Script 1] System Setup: PostgreSQL & Docker ===${NC}"

# Detect OS
OS="$(uname -s)"
case "${OS}" in
    Linux*)     OS_TYPE=Linux;;
    Darwin*)    OS_TYPE=Mac;;
    CYGWIN*|MINGW32*|MSYS*|MINGW*) OS_TYPE=Windows;;
    *)          OS_TYPE="UNKNOWN:${OS}"
esac

echo -e "Detected OS: ${BLUE}${OS_TYPE}${NC}"

# 1. Install/Check PostgreSQL
echo -e "\n${BLUE}Checking PostgreSQL...${NC}"
if ! command -v psql &> /dev/null; then
    echo -e "PostgreSQL not found. Attempting to install..."
    if [ "$OS_TYPE" == "Mac" ]; then
        brew install postgresql
        brew services start postgresql
    elif [ "$OS_TYPE" == "Linux" ]; then
        sudo apt-get update && sudo apt-get install -y postgresql postgresql-contrib
        sudo systemctl start postgresql
    else
        echo -e "${RED}Please download PostgreSQL manually for Windows: https://www.postgresql.org/download/windows/${NC}"
    fi
else
    echo -e "${GREEN}PostgreSQL is already installed.${NC}"
fi

# 2. Install/Check Docker
echo -e "\n${BLUE}Checking Docker...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "Docker not found. Attempting to install..."
    if [ "$OS_TYPE" == "Mac" ]; then
        brew install --cask docker
    elif [ "$OS_TYPE" == "Linux" ]; then
        sudo apt-get update && sudo apt-get install -y docker.io
        sudo systemctl start docker
        sudo usermod -aG docker $USER
        echo -e "${RED}NOTE: You might need to logout and login again for Docker permissions to take effect.${NC}"
    else
        echo -e "${RED}Please download Docker Desktop for Windows: https://www.docker.com/products/docker-desktop/${NC}"
    fi
else
    echo -e "${GREEN}Docker is already installed.${NC}"
fi

echo -e "\n${GREEN}=== Script 1 Selesai! ===${NC}"
echo -e "Pastikan Docker sudah berjalan (Running), lalu jalankan:${BLUE} ./setup-project.sh ${NC}"
