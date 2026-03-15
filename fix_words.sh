#!/bin/bash
find resources/js -type f -name "*.tsx" -o -name "*.ts" -o -name "*.js" | xargs sed -i 's/Selamunknowna/Selamanya/g'
find resources/js -type f -name "*.tsx" -o -name "*.ts" -o -name "*.js" | xargs sed -i 's/segalunknowna/segalanya/g'
find resources/js -type f -name "*.tsx" -o -name "*.ts" -o -name "*.js" | xargs sed -i 's/hunknowna/hanya/g'
find resources/js -type f -name "*.tsx" -o -name "*.ts" -o -name "*.js" | xargs sed -i 's/Semuunknowna/Semuanya/g'
