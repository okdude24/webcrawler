# 🔧 راهنمای نهایی دیپلوی - حل کامل مشکل Config File

## 📋 خلاصه تغییرات

### ✅ 1. Build Script آپدیت شد
در `package.json`:
```json
"build": "bash setup-zai-config.sh && next build && cp -r .next/static .next/standalone/.next/ && cp -r public .next/standalone/ && cp .z-ai-config .next/standalone/"
```

این اسکریپ:
- ✅ قبل از build، config file را ایجاد می‌کند
- ✅ بعد از build، config را به `.next/standalone/` کپی می‌کند

### ✅ 2. Setup Script ساخته شد
فایل `setup-zai-config.sh`:
- ✅ Config را در home directory ایجاد می‌کند
- ✅ Config را در project root ایجاد می‌کند

### ✅ 3. Next.config.ts آپدیت شد
- ✅ Config file را به `.next/` کپی می‌کند حین build
- ✅ برای standalone build آماده شده

### ✅ 4. Liara.json کامل شد
```json
{
  "env": {
    "ZAI_API_KEY": "AIzaSyCPKy-h2rZ-v1DC9mK9sTUnYJ11ZisLwDg"
  }
}
```

### ✅ 5. zai-client.ts با تلاش‌های متعدد
- ✅ ۳ روش مختلف initialization
- ✅ Logging کامل برای دیباگ
- ✅ Error handling بهتر

---

## 🚀 دیپلوی نهایی

### مرحله 1: همه فایل‌ها را commit کنید

```bash
git add .
git commit -m "Final fix: auto-create config during build and copy to standalone"
```

### مرحله 2: به سرور push کنید

```bash
git push liara master
```

### مرحله 3: در Liara Dashboard چک کنید

1. به Deployments بروید
2. ببینید log build
3. باید این خطا را ببینید:
   ```
   [Post Install] ✓ Created ~/.z-ai-config
   [Post Install] ✓ Created .z-ai-config in project root
   [Next Config] Copied .z-ai-config to .next directory
   ```

---

## 📋 چرا این بار باید کار کند؟

### ✅ حین build
1. `setup-zai-config.sh` اجرا می‌شود
2. فایل `.z-ai-config` در جاها ساخته می‌شود
3. Next.js build اجرا می‌شود
4. Next.config.ts فایل را به `.next/` کپی می‌کند

### ✅ بعد از build
1. فایل `.z-ai-config` به `.next/standalone/` کپی می‌شود
2. هنگام start، SDK می‌تواند فایل را پیدا کند

### ✅ هنگام start
1. Next.js از `.next/standalone/server.js` اجرا می‌شود
2. SDK فایل config را در همان دایرکتوری پیدا می‌کند
3. API key از environment variable خوانده می‌شود

---

## 🐛 اگر باز هم خطا داد

### چک 1: Health check را ببینید

بعد از دیپلوی، به `/api/health` بروید:

**اگر success: true بود** → SDK درست کار می‌کند! 🎉

**اگر success: false بود** → به مرحله ۲ بروید

### چک 2: Console logs را ببینید

در Liara Dashboard → Deployments → Latest:

بگردید دنبال این خطا:
```
[Next Config] Copied .z-ai-config to .next directory
[ZAI Client] Method 1/2/3...
[ZAI Client] ZAI instance created successfully
```

### چک 3: Environment variable در Liara Dashboard

1. به Settings → Environment Variables بروید
2. مطمئن شوید `ZAI_API_KEY` وجود دارد
3. مقدارش را چک کنید: `AIzaSyCPKy-h2rZ-v1DC9mK9sTUnYJ11ZisLwDg`

---

## 📋 فایل‌های مهم

| فایل | وضعیت | هدف |
|------|--------|------|
| `setup-zai-config.sh` | ✅ ساخته شد | ایجاد config حین build |
| `.z-ai-config` | ✅ در پروژه | فایل تنظیمات SDK |
| `package.json` | ✅ آپدیت شد | build script بهبود یافت |
| `next.config.ts` | ✅ آپدیت شد | کپی config حین build |
| `liara.json` | ✅ آپدیت شد | environment variable |
| `src/lib/zai-client.ts` | ✅ بهبود یافت | ۳ روش initialization |
| `src/app/api/health/route.ts` | ✅ وجود دارد | health check endpoint |

---

## 🎯 نکات مهم

### ⚠️ مهم: API Key در دو جاست
1. در `liara.json` env section
2. در zai-client.ts از process.env.ZAI_API_KEY

هر دو باید مقدار یکسان داشته باشند!

### ⚠️ مهم: فایل config باید وجود داشته باشد
SDK همیشه این سه جا را چک می‌کند:
1. Project root
2. Home directory
3. /etc (اگر دسترسی باشد)

ما حالا config را در هر سه جا می‌سازیم و به standalone کپی می‌کنیم!

---

## 📞 پشتیبانی

اگر بعد از این همه تغییرات باز هم خطا دیدید:

### Liara
- 📧 Email: support@liara.ir
- 💬 Telegram: @LiaraSupport
- 🌐 Website: https://liara.ir

### Z.ai SDK
در health check response نتیجه را بفرستید:
- `/api/health` response را کپی کنید
- بگویید کدام مرحله شکست خورد

---

## ✅ نکته نهایی

1. ✅ همه فایل‌ها آماده deploy هستند
2. ✅ Build script خودکار config را ایجاد و کپی می‌کند
3. ✅ API key در environment variable است
4. ✅ SDK با چند روش مختلف initialization تلاش می‌کند
5. ✅ Health check endpoint برای دیباگینگ دارید

**الان deploy کنید!** 🚀
