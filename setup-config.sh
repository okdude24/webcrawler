#!/bin/bash

echo "[Post Install] Creating dummy .z-ai-config files..."

# Create config files in all expected locations
mkdir -p .next

cat > .z-ai-config << 'EOF'
{
  "apiKey": ""
}
EOF

cat > .next/.z-ai-config << 'EOF'
{
  "apiKey": ""
}
EOF

echo "[Post Install] ✓ Created .z-ai-config files"
echo "[Post Install] ✓ SDK should not complain about missing config files"

echo "[Post Install] Setup complete"
