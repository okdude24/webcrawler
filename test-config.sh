#!/bin/bash

echo "🔍 Testing ZAI SDK Configuration..."
echo ""

# Check 1: Config file exists
echo "Check 1: .z-ai-config file"
if [ -f ".z-ai-config" ]; then
    echo "✓ Found in project root"
    cat .z-ai-config
else
    echo "✗ Not found in project root"
fi

echo ""
echo "Check 2: Home directory"
if [ -f ~/.z-ai-config ]; then
    echo "✓ Found in home directory"
    cat ~/.z-ai-config
else
    echo "✗ Not found in home directory"
fi

echo ""
echo "Check 3: Environment variable"
if [ -z "$ZAI_API_KEY" ]; then
    echo "✗ ZAI_API_KEY not set in shell environment"
else
    echo "✓ ZAI_API_KEY is set"
    echo "  Length: ${#ZAI_API_KEY}"
    echo "  First 10: ${ZAI_API_KEY:0:10}..."
fi

echo ""
echo "Check 4: package.json build script"
if grep -q "setup-zai-config.sh" package.json; then
    echo "✓ Build script includes setup script"
else
    echo "✗ Build script doesn't include setup script"
fi

echo ""
echo "===================================="
echo "✅ Tests complete!"
echo "===================================="
echo ""
echo "Next steps:"
echo "1. git add ."
echo "2. git commit -m 'Test SDK configuration'"
echo "3. git push liara master"
echo "4. Check /api/health after deployment"
