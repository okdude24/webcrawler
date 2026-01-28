# 🔧 رفع مشکل Configuration file not found - راهنمای کامل

## 📋 وضعیت فعلی

**مشکل**: خطای `Configuration file not found or invalid` در سرور شخصی (Liara)

**نکات مهم**:
- ❌ API key شما در environment variable نیست
- ❌ فایل `.z-ai-config` شاید به سرور کپی نشده
- ❌ SDK نمی‌تواند initialize شود

---

## ✅ چه کاری انجام شده؟

### 1. ✅ API Key شما تنظیم شد
```bash
# در .env.production
ZAI_API_KEY=AIzaSyCPKy-h2rZ-v1DC9mK9sTUnYJ11ZisLwDg

# در liara.json
"env": {
  "ZAI_API_KEY": "AIzaSyCPKy-h2rZ-v1DC9mK9sTUnYJ11ZisLwDg"
}
```

### 2. ✅ Module zai-client بهتر شد
- مدیریت خودکار connection
- Singleton pattern برای performance
- Log های کامل برای دیباگینگ
- مدیریت error بهتر

### 3. ✅ Health Check Endpoint ساخته شد
- Endpoint جدید: `/api/health`
- بررسی SDK initialization
- نمایش environment variables

### 4. ✅ Config File آپدیت شد
- فایل `.z-ai-config` با محتوا درست ساخته شد

---

## 🚀 دیپلوی - دستورال کامل

### مرحله 1: تغییرات را commit کنید

```bash
git add .
git commit -m "Fix SDK configuration and add health check"
```

### مرحله 2: به سرور push کنید

```bash
git push liara master
```

### مرحله 3: در Liara Dashboard Environment Variables را تنظیم کنید

**اگر از Liara CLI استفاده می‌کنید:**
- API key در `liara.json` تنظیم شده است ✓

**اگر از Git Integration استفاده می‌کنید:**
1. به Liara Dashboard بروید
2. پروژه خود را انتخاب کنید
3. به **Settings → Environment Variables** بروید
4. اضافه کنید:
   - Name: `ZAI_API_KEY`
   - Value: `AIzaSyCPKy-h2rZ-v1DC9mK9sTUnYJ11ZisLwDg`

---

## 🔍 چک کردن اینکه SDK کار می‌کند

### بعد از دیپلوی:

1. به Health Endpoint بروید:
   ```
   https://your-domain.com/api/health
   ```

2. باید این را ببینید:
   ```json
   {
     "success": true,
     "message": "ZAI SDK initialized successfully",
     "environment": {
       "NODE_ENV": "production",
       "hasApiKey": true,
       "apiKeyLength": 44
     }
   }
   ```

3. اگر `success: false` دیدید:
   - مشکل در environment variables دارید
   - بگویید چه چیزی در `environment` section آمده

---

## 🐛 اگر باز هم خطا داد

### روش 1: از Vercel استفاده کنید (توصیه می‌شود)

```bash
npm i -g vercel
vercel
```

Vercel مزایتی دارد:
- ✅ کاملاً خودکار
- ✅ بدون نیاز به فایل `.z-ai-config`
- ✅ پشتیبانی عالی از Next.js
- ✅ رایگان
- ✅ سریع

### روش 2: Environment Variable را در Liara چک کنید

1. به Liara Dashboard بروید
2. پروژه را انتخاب کنید
3. به **Environment Variables** بروید
4. مطمئن شوید `ZAI_API_KEY` وجود دارد و مقدار درست است

### روش 3: Console Log را ببینید

در Liara Dashboard → Deployments → Latest را باز کنید:
- ببینید چه خطایی در console آمده است
- بگردید دنبال `[ZAI Client]` یا `[API]` logs

---

## 📋 فایل‌های مهم در پروژه

| فایل | هدف | وضعیت |
|------|------|--------|
| `.z-ai-config` | Config فایل SDK | ✅ ساخته شد |
| `.env.production` | Environment variables | ✅ API key اضافه شد |
| `liara.json` | Liara configuration | ✅ env section بهبود یافت |
| `src/lib/zai-client.ts` | SDK client module | ✅ بهتر شد با logging |
| `src/app/api/health/route.ts` | Health check endpoint | ✅ جدید ساخته شد |
| `src/app/api/search/route.ts` | Search API | ✅ استفاده از zai-client |

---

## 🔧 Troubleshooting

### مشکل 1: `hasApiKey: false` در health check

**دلیل**: API key در environment variable نیست

**راه حل**:
```bash
# در Liara Dashboard اضافه کنید
Name: ZAI_API_KEY
Value: AIzaSyCPKy-h2rZ-v1DC9mK9sTUnYJ11ZisLwDg
```

### مشکل 2: `apiKeyLength: 0` در health check

**دلیل**: API key خالی است

**راه حل**:
مقدار API key را در Liara Dashboard چک کنید

### مشکل 3: Connection timeout

**دلیل**: SDK نمی‌تواند به API وصل شود

**راه حل**:
- API key را بررسی کنید که درست است
- پشتیبانی Liara را تماس بگیرید

### مشکل 4: Port 3000 در دسترس نیست

**دلیل**: PORT=3000 تنظیم نشده

**راه حل**:
در `liara.json` یا Liara Dashboard:
```json
"env": {
  "PORT": "3000"
}
```

---

## 📞 پشتیبانی

اگر بعد از همه این‌ها باز خطا دیدید:

### Liara Support
- 📧 Email: support@liara.ir
- 💬 Telegram: @LiaraSupport
- 🌐 Website: https://liara.ir

### Z.ai Support
اگر مشکل از سمت SDK/API است:
- 📧 بگویید: مشکل در initialize کردن z-ai-web-dev-sdk
- 📋 Health check response را بفرستید

---

## ✅ نکته نهایی

1. **همیشه اول health check را ببینید**: `/api/health`
2. **Console logs را بررسی کنید**: هر خطا با `[ZAI Client]` یا `[API]` شروع می‌شود
3. **Environment variables را در dashboard چک کنید**: مطمئن شوید مقدار درست است
4. **از Vercel استفاده کنید اگر Liara پیچیده است**: ساده‌تر و سریع‌تر

---

## 🚀 Deploy کنید

```bash
git add .
git commit -m "Complete SDK fix"
git push liara master
```

سپس **health check را تست کنید**:
```
https://your-site.liara.run/api/health
```

اگر `success: true` بود، سایت کار می‌کند! 🎉
