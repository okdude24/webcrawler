# معماری سیستم جستجوی خزنده وب

## جریان داده

```
👤 کاربر (Browser)
    ↓
    [تایپ کردن در نوار جستجو]
    ↓
[Frontend: page.tsx]
    ↓ fetch() → /api/search
    ↓
[Backend API: src/app/api/search/route.ts]
    ↓ zai.functions.invoke('web_search')
    ↓
[z-ai-web-dev-sdk]
    ↓ (موتور جستجوی داخلی)
    ↓
[موتور جستجو] ← → گوگل، بینگ و سایر منابع
    ↓
[نتایج جستجو]
    ↓
[API Response]
    ↓
[Frontend نمایش به کاربر]
```

## اجزای اصلی

### 1. Frontend (page.tsx)
- **زبان**: TypeScript + React
- **Role**: مدیریت UI و تعامل با کاربر
- **کارها**:
  - دریافت ورودی از کاربر
  - نمایش نتایج در سه نوع (همه، تصاویر، اخبار)
  - مدیریت loading states
  - نمایش خطاها

### 2. Backend API (route.ts)
- **زبان**: TypeScript + Next.js API Routes
- **Role**: واسط بین Frontend و Z.ai SDK
- **کارها**:
  - دریافت درخواست از فرانت‌اند
  - استفاده از z-ai-web-dev-sdk
  - پردازش و فورمت کردن نتایج
  - هندلینگ خطاها

### 3. z-ai-web-dev-sdk
- **نام**: Z.ai Web Development SDK
- **Role**: ارتباط با سرویس‌های هوش مصنوعی Z.ai
- **ویژگی‌ها**:
  - جستجوی وب
  - تولید تصاویر AI
  - مبدل متن به صدا (TTS)
  - تبدیل صدا به متن (ASR)
  - چت با LLM
  - و غیره

## فلوهای مختلف

### جستجوی وب (همه)
```
کاربر → تایپ "هوش مصنوعی"
   ↓
Frontend → POST /api/search?type=all&q=هوش+مصنوعی
   ↓
Backend → zai.functions.invoke('web_search', {query, num: 10})
   ↓
SDK → درخواست به موتور جستجو (گوگل/بینگ)
   ↓
موتور → 10 نتیجه
   ↓
Backend → فورمت به استاندارد
   ↓
Frontend → نمایش به کاربر
```

### جستجوی تصاویر
```
کاربر → تایپ "طبیعت" + انتخاب تب "تصاویر"
   ↓
Frontend → POST /api/search?type=images&q=طبیعت
   ↓
Backend → zai.images.generations.create({
           prompt: "Beautiful illustration of طبیعت",
           size: "1024x1024"
         })
   ↓
SDK → درخواست به مدل تولید تصویر AI
   ↓
AI Model → 4 تصویر base64
   ↓
Backend → فورمت
   ↓
Frontend → نمایش در گرید 2×2
```

### جستجوی اخبار
```
کاربر → تایپ "تکنولوژی" + انتخاب تب "اخبار"
   ↓
Frontend → POST /api/search?type=news&q=تکنولوژی
   ↓
Backend → zai.functions.invoke('web_search', {
           query: "تکنولوژی news latest today breaking news",
           num: 10
         })
   ↓
SDK → درخواست به موتور جستجو
   ↓
موتور → اخبار مرتبط
   ↓
Backend → فورمت + مرتب‌سازی
   ↓
Frontend → نمایش با آیکون روزنامه
```

## چرا از SDK استفاده کردم؟

### ✅ مزایا
1. **سادگی**: بدون نیاز به API key جداگانه
2. **امنیت**: مدیریت هدرها و احراز هویت
3. **پایداری**: بهروزرسانی‌های خودکار
4. **پشتیبانی**: مستندات و مثال‌های کامل
5. **Type Safety**: TypeScript definitions

### ❌ اگر مستقیماً از گوگل استفاده می‌کردم:
1. نیاز به Google Custom Search API key
2. نیاز به Google Cloud Console تنظیم
3. نیاز به پرداخت جداگانه
4. محدودیت‌های قیمتی (100 جستجو روزانه رایگان)
5. مدیریت rate limiting و rate limits

## معماری امنیتی

```
┌─────────────────────────────────────────┐
│     Frontend (Browser)            │
│  - نمایش UI                        │
│  - ارسال درخواست HTTP         │
└────────────┬──────────────────────────┘
             │ HTTPS
             ↓
┌─────────────────────────────────────────┐
│  Next.js API Route (Backend)        │
│  - دریافت و اعتبارسنجی           │
│  - استفاده از z-ai-web-dev-sdk    │
│  - فورمت کردن پاسخ              │
└────────────┬──────────────────────────┘
             │ SDK API Call
             ↓
┌─────────────────────────────────────────┐
│  z-ai-web-dev-sdk                │
│  - مدیریت احراز هویت             │
│  - موتور جستجوی داخلی       │
│  - هندلینگ خطاها              │
└────────────┬──────────────────────────┘
             │ HTTP/HTTPS
             ↓
┌─────────────────────────────────────────┐
│  Search Engines (گوگل/بینگ/...)   │
│  - ایندکس کردن وب                 │
│  - رتبه‌بندی نتایج              │
└─────────────────────────────────────────┘
```

## پاسخ API

```json
{
  "success": true,
  "query": "هوش مصنوعی",
  "type": "all",
  "results": [
    {
      "url": "https://example.com/article",
      "name": "عنوان مقاله",
      "snippet": "توضیحات کوتاه...",
      "host_name": "example.com",
      "rank": 1,
      "date": "2024-01-28",
      "favicon": "https://example.com/favicon.ico"
    }
  ],
  "total": 10
}
```
