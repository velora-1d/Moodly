#!/bin/bash
sed -i "s/files: \['resources\\\\\/js\\\\/\*\*\/\*\.{ts,tsx,js,jsx}'\]/files: \['resources\/js\/\*\*\/\*\.{ts,tsx,js,jsx}'\]/g" eslint.config.js
