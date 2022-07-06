const fs = require('fs');

class flaiscodeDatabase {
    constructor(options) {
        this.options = options;
        if (!options.file) throw new Error('[Hata] : Veritabanı dosyası tespit edilemedi.');

        let stats;
        try {
            stats = fs.statSync(options.file)
        } catch (error) {
            if (error.code === 'ENOENT') {
                fs.writeFileSync(this.options.file, "{}", "utf-8");
            } else if (error.code === 'EACCES') {
                throw new Error('[Hata] : Dosya yoluna erişim sağlanamadı.')
            } else {
                throw new Error('[Hata] : ' + error)
            }
        }

        this.data = {};

    }
    set(key, value) {
        if (!key) throw new Error('[Hata] : Key kısmı boş bırakılamaz.')
        if (!value) throw new Error('[Hata] : Value kısmı boş bırakılamaz.')

        let obj = fs.readFileSync(this.options.file);
        obj = JSON.parse(obj);
        obj[key] = value;

        fs.writeFileSync(this.options.file, JSON.stringify(obj, null, 2), "utf-8")
        return { status: true, key, value }
    }
    delete(key) {
        if (!key) throw new Error('[Hata] : Key kısmı boş bırakılamaz.')

        let obj = fs.readFileSync(this.options.file);
        obj = JSON.parse(obj);
        
        if (!obj[key]) throw new Error('[Hata] : Bu anahtara ait bir veri bulunamadı.')

        delete obj[key];
        fs.writeFileSync(this.options.file, JSON.stringify(obj, null, 2), "utf-8")
        return true;
    }
    get(key) {
        if (!key) throw new Error('[Hata] : Key kısmı boş bırakılamaz.')

        let obj = fs.readFileSync(this.options.file);
        obj = JSON.parse(obj);

        if (!obj[key]) return false;

        return obj[key]
    }
    push(key, value) {
        if (!key) throw new Error('[Hata] : Key kısmı boş bırakılamaz.')
        if (!value) throw new Error('[Hata] : Value kısmı boş bırakılamaz.')

        let obj = fs.readFileSync(this.options.file);
        obj = JSON.parse(obj);
        if (!obj[key]) obj[key] = [];
        obj[key].push(value);
        fs.writeFileSync(this.options.file, JSON.stringify(obj, null, 2), "utf-8")

        return this.get(key);
    }
    remove(key, value) {
        if (!key) throw new Error('[Hata] : Key kısmı boş bırakılamaz.')
        if (!value) throw new Error('[Hata] : Value kısmı boş bırakılamaz.')

        let obj = fs.readFileSync(this.options.file);
        obj = JSON.parse(obj);
        obj[key] = obj[key].filter(g => g !== value) // başka ne ekleyelim?

        fs.writeFileSync(this.options.file, JSON.stringify(obj, null, 2), "utf-8")

        return this.get(key);
    }
    add(key, value) {
        if (!key) throw new Error('[Hata] : Key kısmı boş bırakılamaz.')
        if (!value) throw new Error('[Hata] : Value kısmı boş bırakılamaz.')

        let obj = fs.readFileSync(this.options.file);
        obj = JSON.parse(obj);
        if(!obj[key]) obj[key] = 0;
        obj[key] += value;
        fs.writeFileSync(this.options.file, JSON.stringify(obj, null, 2), "utf-8")
        return this.get(key);
    }
    subtract(key, value) {
        if (!key) throw new Error('[Hata] : Key kısmı boş bırakılamaz.')
        if (!value) throw new Error('[Hata] : Value kısmı boş bırakılamaz.')

        let obj = fs.readFileSync(this.options.file);
        obj = JSON.parse(obj);
        if(!obj[key]) obj[key] = 0;
        obj[key] -= value;
        fs.writeFileSync(this.options.file, JSON.stringify(obj, null, 2), "utf-8")
        return this.get(key);
    }
    deleteAll() {
        let obj = fs.readFileSync(this.options.file);
        obj = JSON.parse(obj);
        obj = {};
        fs.writeFileSync(this.options.file, JSON.stringify(obj, null, 2), "utf-8")
        return true;
    }
    all() {
        let obj = fs.readFileSync(this.options.file);
        obj = JSON.parse(obj);
        return obj;
    }
}

module.exports = flaiscodeDatabase;
