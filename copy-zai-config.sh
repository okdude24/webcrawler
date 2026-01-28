#!/bin/bash

echo "📋 Copying .z-ai-config to required locations..."

# 1. Copy to project root (already exists)
echo "✓ Already in project root: /home/z/my-project/.z-ai-config"

# 2. Copy to home directory
cp .z-ai-config ~/.z-ai-config 2>/dev/null && echo "✓ Copied to home: ~/.z-ai-config" || echo "✗ Failed to copy to home"

# 3. Copy to /etc (requires sudo, will fail but that's ok)
sudo cp .z-ai-config /etc/.z-ai-config 2>/dev/null && echo "✓ Copied to /etc: /etc/.z-ai-config" || echo "ℹ Requires sudo for /etc"

# 4. Copy txt version to home
cp z-ai-config.txt ~/z-ai-config.txt 2>/dev/null && echo "✓ Copied txt to home: ~/z-ai-config.txt" || echo "✗ Failed to copy txt"

echo ""
echo "🎉 Done! Files copied to:"
echo "  - Project root: .z-ai-config"
echo "  - Home directory: ~/.z-ai-config"
echo "  - Home (txt): ~/z-ai-config.txt"
echo "  - /etc (if sudo available): /etc/.z-ai-config"
