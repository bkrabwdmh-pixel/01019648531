```javascript
// storage.js - إدارة البيانات المحلية
class DataManager {
    constructor() {
        this.STORAGE_KEY = 'fb_victim_data';
        this.MAX_ITEMS = 50;
    }
    
    // حفظ بيانات جديدة
    save(data) {
        try {
            // تحميل البيانات الحالية
            let allData = this.loadAll() || [];
            
            // إضافة البيانات الجديدة
            allData.push({
                id: Date.now(),
                timestamp: new Date().toISOString(),
                data: data
            });
            
            // الاحتفاظ بأحدث 50 سجل فقط
            if (allData.length > this.MAX_ITEMS) {
                allData = allData.slice(-this.MAX_ITEMS);
            }
            
            // الحفظ
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allData));
            return true;
            
        } catch (e) {
            console.error('Error saving data:', e);
            return false;
        }
    }
    
    // تحميل جميع البيانات
    loadAll() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    }
    
    // الحصول على أحدث بيانات
    getLatest() {
        const allData = this.loadAll();
        return allData.length > 0 ? allData[allData.length - 1] : null;
    }
    
    // تصدير جميع البيانات
    exportAll() {
        const allData = this.loadAll();
        const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
        return URL.createObjectURL(blob);
    }
    
    // مسح البيانات
    clear() {
        localStorage.removeItem(this.STORAGE_KEY);
    }
}

// إنشاء نسخة عامة
const dataManager = new DataManager();
```
