const CACHE_NAME = 'quran-cache-v1';

// نصب سرویس ورکر و کش کردن فایل‌های اولیه (مثل خود صفحه HTML)
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                './',
                './index.html'
            ]);
        })
    );
});

// رهگیری درخواست‌ها: اگر آفلاین بودیم یا فایل تو حافظه بود، از روی حافظه بخون
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // اگر در کش مرورگر موجود بود (آفلاین یا دانلود شده)، همان را برگردان
            if (response) {
                return response;
            }
            // در غیر این صورت از اینترنت دانلود کن
            return fetch(event.request);
        })
    );
});
