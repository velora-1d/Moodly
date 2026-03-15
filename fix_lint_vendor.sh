#!/bin/bash
sed -i "s/files: \['\*\*\/\*\.{ts,tsx,js,jsx}'\]/files: ['resources\/js\/\*\*\/\*\.{ts,tsx,js,jsx}']/g" eslint.config.js
