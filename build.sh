#!/bin/bash

# Install frontend dependencies
npm install

# Build frontend
npm run build

# Install backend dependencies
cd server
pip install -r requirements.txt

# Return to root directory
cd ..