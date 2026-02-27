#!/bin/bash

# ANSI Color Codes
CYAN='\033[0;36m'
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${CYAN}🛡️  Operation Sentinel: Deploying Services...${NC}"

# 1. Kill any existing processes on ports 5000 and 3000 (Safety first)
echo "Cleaning up ports..."
lsof -ti:5000 | xargs kill -9 2>/dev/null
lsof -ti:3000 | xargs kill -9 2>/dev/null

# 2. Start Backend Engine in the background
echo -e "${GREEN}[1/2] Launching Backend Sentinel Engine...${NC}"
cd backend
npm start & 
BACKEND_PID=$! # Store process ID to kill it later if needed

# 3. Start Frontend Dashboard in the foreground
echo -e "${GREEN}[2/2] Launching Frontend Control Room...${NC}"
cd ../frontend
npm start

# Note: Since the frontend is in the foreground, 
# closing the terminal or hitting Ctrl+C will stop the UI.status
