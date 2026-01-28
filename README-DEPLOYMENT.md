# راهنمای دیپلوی خزنده وب

## 🔧 پیش‌نیازها

1. **Node.js** نسخه 18 یا بالاتر
2. **Bun** یا **npm** برای مدیریت پکیج‌ها
3. **z-ai-web-dev-sdk** (نصب شده)

## 📦 نصب

```bash
# با npm
npm install

# با bun
bun install
```

## 🚀 اجرا در محیط local

```bash
# Development
npm run dev

# Production build
npm run build

# Production start
npm start
```

## 🌐 دیپلوی به Liara

### 1. فایل‌های تنظیمات موجود هستند

- ✅ `liara.json` - تنظیمات Liara
- ✅ `.z-ai-config` - تنظیمات SDK
- ✅ `.env.production` - environment variables

### 2. دیپلوی

```bash
# 1. تغییرات را به git اضافه کنید
git add .
git commit -m "Add deployment configuration"

# 2. به Liara push کنید
git push liara master

# 3. یا از CLI استفاده کنید
liara deploy
```

## ⚙️ تنظیمات محیطی (Environment Variables)

### فایل `.env.production`

این فایل شامل تنظیمات محیط production است:

```env
NODE_ENV=production
PORT=3000
```

### در Liara Dashboard

باید environment variables را در Dashboard Liara تنظیم کنید:

1. به **Liara Dashboard** بروید
2. پروژه خود را انتخاب کنید
3. به **Settings → Environment Variables** بروید
4. اضافه کنید:
   - `NODE_ENV` = `production`
   - `PORT` = `3000`

## 🔧 فایل `.z-ai-config`

SDK این فایل را برای تنظیمات خود استفاده می‌کند. فایل در پروژه موجود است و محتویات زیر دارد:

```json
{
  "apiKey": ""
}
```

## 🐛 رفع مشکلات رایج

### مشکل 1: "Configuration file not found"

**راه حل:**
فایل `.z-ai-config` در پروژه وجود دارد. اگر هنوز خطا می‌دهد:

```bash
# مطمئن شوید فایل در پروژه است
ls -la .z-ai-config

# اگر نیست، بسازید:
echo '{"apiKey": ""}' > .z-ai-config
```

### مشکل 2: "Failed to perform search"

**علت:**
SDK نمی‌تواند به سرویس جستجو وصل شود

**راه حل:**
1. بررسی کنید که فایل `.z-ai-config` در build وجود دارد
2. Environment variables را در Liara Dashboard تنظیم کنید

### مشکل 3: خطای Liara configure.sh

**راه حل:**
از نسخه Node.js استفاده کنید:

```bash
# در liara.json استفاده از npm:
"build": {
  "cmd": "npm install && npm run build"
}
```

### مشکل 4: Port conflict

**راه حل:**
باز کنید که PORT=3000 تنظیم شده است:

```bash
# در .env.production
PORT=3000

# در liara.json
"env": {
  "PORT": "3000"
}
```

## 📋 لیست فایل‌های مهم

- `liara.json` - تنظیمات دیپلوی Liara
- `.z-ai-config` - تنظیمات Z.ai SDK
- `.env.production` - environment variables
- `.gitignore` - فایل‌هایی که نباید commit شوند
- `next.config.ts` - تنظیمات Next.js

## ✅ چک‌لیست قبل از دیپلوی

- [ ] فایل `.z-ai-config` در پروژه است؟
- [ ] `liara.json` در پروژه است؟
- [ ] Environment variables در Liara Dashboard تنظیم شده؟
- [ ] Node.js نسخه درست نصب است؟
- [ ] Build محلی موفق است؟ (`npm run build`)

## 🆘 پشتیبانی

اگر با مشکلی مواجه شدید:

1. **Liara Support**: support@liara.ir
2. **Telegram**: @LiaraSupport
3. **Website**: https://liara.ir

---

## 🔄 دیپلوی به Vercel (گزینه جایگزین)

اگر Liara مشکل داشت، Vercel پیشنهاد می‌شود:

```bash
# نصب Vercel CLI
npm i -g vercel

# دیپلوی
vercel
```

Vercel مزایتی دارد:
- ✅ خودکار
- ✅ رایگان
- ✅ پشتیبانی عالی از Next.js
- ✅ بدون نیاز به تنظیمات پیچیده
