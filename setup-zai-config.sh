#!/bin/bash

echo "[Post Install] Setting up ZAI configuration..."

# Create .z-ai-config in home directory
cat > ~/.z-ai-config << 'EOF'
{
  "apiKey": ""
}
EOF

echo "[Post Install] ✓ Created ~/.z-ai-config"

# Also create in project root
cat > .z-ai-config << 'EOF'
{
  "apiKey": ""
}
EOF

echo "[Post Install] ✓ Created .z-ai-config in project root"

echo "[Post Install] ✓ Setup complete"
