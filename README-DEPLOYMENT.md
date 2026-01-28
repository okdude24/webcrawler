# راهنمای دیپلوی خزنده وب - نسخه نهایی

## ✅ تغییرات نهایی

### 1. API Key تنظیم شد
- ✅ API key شما در `.env.production` قرار گرفت
- ✅ API key در `liara.json` اضافه شد
- ✅ Module جدید `zai-client.ts` ساخته شد

### 2. بهبود SDK Client
فایل جدید `src/lib/zai-client.ts`:
- ✅ API key را از environment variable می‌خواند
- ✅ بدون نیاز به فایل `.z-ai-config`
- ✅ مدیریت خودکار connection

### 3. API Route آپدیت شد
فایل `src/app/api/search/route.ts`:
- ✅ استفاده از `zai-client` module
- ✅ مدیریت خطاها بهتر
- ✅ لاگینگ کامل

---

## 🚀 دیپلوی

### مرحله 1: تغییرات را commit کنید

```bash
git add .
git commit -m "Add API key and improve SDK client"
```

### مرحله 2: دوباره deploy کنید

```bash
git push liara master
# یا
liara deploy
```

### مرحله 3: Environment Variables در Liara

**اگر از Liara CLI استفاده می‌کنید**:
نیازی نیست چون در `liara.json` تنظیم شده است!

**اگر از Git integration استفاده می‌کنید**:
باید در Liara Dashboard این متغیر را اضافه کنید:
- Name: `ZAI_API_KEY`
- Value: `AIzaSyCPKy-h2rZ-v1DC9mK9sTUnYJ11ZisLwDg`

---

## 📋 لیست فایل‌های تغییر یافته

| فایل | تغییرات |
|------|---------|
| `.env.production` | ✅ ZAI_API_KEY اضافه شد |
| `liara.json` | ✅ env section با ZAI_API_KEY |
| `src/lib/zai-client.ts` | ✅ فایل جدید - مدیریت SDK |
| `src/app/api/search/route.ts` | ✅ استفاده از zai-client |

---

## 🔧 چطور کار می‌کند؟

### معماری جدید:

```
[API Request]
       ↓
[Next.js API Route]
       ↓
[zai-client.ts module]
       ↓ checks: process.env.ZAI_API_KEY
       ↓ if exists: use API key
       ↓ if not: use default config
       ↓
[Z.ai SDK]
       ↓
[Search API]
```

### مزایا این روش:

✅ **بدون نیاز به فایل .z-ai-config**
✅ **API Key در environment variable** امن است
✅ **بدون مشکل مسیر فایل** روی سرور شخصی
✅ **مدیریت ساده connection**

---

## 🐛 اگر خطا دیدید:

### خطا 1: Configuration file not found
**نمی‌باید دیگر این خطا را نبینید!** چون دیگر از فایل استفاده نمی‌کنیم.

### خطا 2: ZAI_API_KEY invalid
**علت**: API key اشتباه است
**راه حل**: API key را بررسی کنید

### خطا 3: Failed to perform search
**علت**: مشکل در API
**راه حل**: Console log را در سرور بررسی کنید

---

## 📞 بررسی پس از دیپلوی

```bash
# در Liara Dashboard
1. به Deployments بروید
2. آخرین deployment را باز کنید
3. Logs را ببینید
```

به دنبال این خطا باشید:

✅ `[API] Search request: ...` ← درخواست‌ها
✅ `[ZAI Client] Using API key from environment variable` ← استفاده از API key
✅ `[API] Successfully generated images: X` ← موفقیت

---

## 🎯 نکات مهم

### Security:
- ❌ API key را commit نکنید به git
- ✅ فقط در `liara.json` و `.env.production` (محیط production)
- ✅ این فایل‌ها در `.gitignore` هستند

### Performance:
- ✅ Connection pooling با zai-client singleton
- ✅ Re-use ZAI instance
- ✅ بهبود سرعت جستجو

---

## 📞 پشتیبانی

اگر بعد از دیپلوی مشکلی داشتید:

1. **Liara Support**: support@liara.ir
2. **Telegram**: @LiaraSupport
3. **Website**: https://liara.ir

**متن گزارش:**
> "پروژه Next.js با z-ai-web-dev-sdk دارم که API key را در environment variable تنظیم کردم ولی خطا می‌دهد. لطفاً کمک کنید."

---

## ✅ آماده دیپلوی!

همه چیزها آماده است:
- ✅ API key تنظیم شده
- ✅ Module zai-client ساخته شده
- ✅ API routes بهبود یافته
- ✅ Liara configuration کامل

**الان deploy کنید و لذت ببرید!** 🎉
