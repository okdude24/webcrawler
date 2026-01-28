# 🔧 رفع مشکل Configuration file not found

## مشکل چیست؟

SDK خطای `Configuration file not found or invalid` می‌دهد چون نمی‌تواند فایل `.z-ai-config` را پیدا کند.

---

## ✅ چه کارهایی انجام شد؟

### 1. فایل کپی شد به همه مسیرهای مورد نیاز:
```bash
✓ Project root: /home/z/my-project/.z-ai-config
✓ Home directory: ~/.z-ai-config  ← این مهم است!
✓ Home (txt): ~/z-ai-config.txt
```

### 2. Environment variable تنظیم شد:
در فایل `.env.production` اضافه کردم:
```env
ZAI_CONFIG_PATH=/home/z/.z-ai-config
```

---

## 🚀 الان چه کار باید بکنید؟

### روش 1: Deploy دوباره با Liara

```bash
# 1. تغییرات را commit کنید
git add .
git commit -m "Fix SDK config paths"

# 2. دوباره deploy کنید
liara deploy
```

### روش 2: اگر باز هم خطا داد - از Vercel استفاده کنید

```bash
# Vercel ساده‌تر است و بدون این مشکل کار می‌کند
npm i -g vercel
vercel
```

---

## 📋 فایل‌هایی که الان موجود هستند:

| فایل | مسیر | هدف |
|------|------|------|
| .z-ai-config | `/home/z/my-project/.z-ai-config` | Project root |
| .z-ai-config | `~/.z-ai-config` | Home directory ← مهم! |
| z-ai-config.txt | `~/z-ai-config.txt` | Home directory |
| .env.production | `.env.production` | Environment variables |

---

## 🎯 اگر Vercel استفاده می‌کنید:

برای Vercel، environment variable را در Dashboard تنظیم کنید:

1. به [Vercel Dashboard](https://vercel.com/dashboard) بروید
2. پروژه را انتخاب کنید
3. به **Settings → Environment Variables** بروید
4. اضافه کنید:
   - Name: `ZAI_CONFIG_PATH`
   - Value: `/tmp/.z-ai-config` (در Vercel /tmp قابل دسترسی است)

---

## 🔍 در Local چک کنید:

```bash
# ببینید فایل در home directory هست
ls -la ~/.z-ai-config

# محتوا را ببینید
cat ~/.z-ai-config
```

---

## 📦 در Liara:

وقتی deploy می‌کنید، Liara environment variables را از `.env.production` می‌خواند.

**اگر باز هم خطا داد**، با پشتیبانی Liara تماس بگیرید:

- 📧 Email: support@liara.ir
- 💬 Telegram: @LiaraSupport
- 🌐 Website: https://liara.ir

بگویید: "SDK cannot find .z-ai-config file"
