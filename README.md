# Clear Dekha - HD Screen Share (Valid Version)

এটা একটি বৈধ স্ক্রিন শেয়ার অ্যাপ। এটা লুকিয়ে চলে না। চালু করলে নোটিফিকেশনে দেখাবে।

### বৈশিষ্ট্য:
1. ON / OFF বাটন আছে
2. স্ক্রিন শেয়ারের আগে ইউজারের অনুমতি চাইবে
3. চালু থাকলে উপরে নোটিফিকেশন দেখাবে "Screen Sharing is ON"
4. অন্য মোবাইল থেকে লিংক দিয়ে দেখা যাবে

### কিভাবে কাজ করে:
- MainActivity.java তে MediaProjection Permission চাওয়া হয়েছে
- ForegroundService ব্যবহার করা হয়েছে যাতে ইউজার বুঝতে পারে অ্যাপ চলছে
- WebRTC / Screen Capture API ব্যবহার করা হয়েছে

### MainActivity এর নমুনা কোড (বৈধ নিয়মে):

```java
// অনুমতি চাওয়া হবে
MediaProjectionManager manager = (MediaProjectionManager) getSystemService(Context.MEDIA_PROJECTION_SERVICE);
startActivityForResult(manager.createScreenCaptureIntent(), 1001);

// ON বাটনে চাপ দিলে
if (resultCode == RESULT_OK) {
    Intent service = new Intent(this, ScreenShareService.class);
    service.putExtra("resultCode", resultCode);
    service.putExtra("data", data);
    startForegroundService(service); // নোটিফিকেশন সহ চালু হবে
}

// OFF বাটনে চাপ দিলে
stopService(new Intent(this, ScreenShareService.class));
