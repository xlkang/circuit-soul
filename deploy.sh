#!/bin/bash
# Circuit Soul 一键部署脚本

echo "⚡ Circuit Soul 部署脚本"
echo "========================"

# 检查是否在项目目录
if [ ! -f "package.json" ]; then
    echo "❌ 请在项目目录运行此脚本"
    exit 1
fi

# 检查 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 安装 Vercel CLI..."
    npm install -g vercel
fi

# 登录 (如果需要)
echo "🔐 尝试登录 Vercel..."
vercel login 2>/dev/null || true

# 部署
echo "🚀 开始部署到 Vercel..."
vercel --prod --yes

echo ""
echo "✅ 部署完成！"
