#!/bin/bash

# ANSI Color Codes for pretty output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🛡️  Operation Sentinel: System Initialization${NC}"

# 1. Check for Node.js
if ! command -v node &> /dev/null
then
    echo -e "${RED}Error: Node.js is not installed. Please install it to continue.${NC}"
    exit 1
fi

# 2. Install Root Dependencies (for concurrently, etc.)
echo -e "${GREEN}Step 1: Installing root dependencies...${NC}"
npm install

# 3. Backend Setup
echo -e "${GREEN}Step 2: Configuring Backend Engine...${NC}"
cd backend
npm install
# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo "PORT=5000" > .env
    echo "DATABASE_URL=\"file:./dev.db\"" >> .env
fi
cd ..

# 4. Frontend Setup
echo -e "${GREEN}Step 3: Configuring Frontend Control Room...${NC}"
cd frontend
npm install
cd ..

# 5. Final Confirmation
echo -e "${BLUE}---------------------------------------${NC}"
echo -e "${GREEN}✅ Setup Successful!${NC}"
echo -e "To start the system, run: ${BLUE}npm start${NC}"
echo -e "${BLUE}---------------------------------------${NC}"