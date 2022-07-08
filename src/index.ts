import fs from 'fs'

class FlaiscodeDatabase {
  private file: string

  constructor(file: string) {
    if (!file) throw new Error('[Hata]: Veritabanı dosyası tespit edilemedi!')
    this.file = file

    try {
      fs.statSync(this.file)
    } catch (error) {
      if (error.code === 'ENOENT') {
        fs.writeFileSync(this.file, '{}', 'utf-8')
      } else if (error.code === 'EACCES') {
        throw new Error('[Hata]: Dosya yoluna erişim sağlanamadı.')
      } else {
        throw new Error('[Hata]: ' + error)
      }
    }
  }

  get(key: string) {
    if (!key) throw new Error('[Hata]: Key kısmı boş bırakılamaz.')

    let obj = fs.readFileSync(this.file)
    obj = JSON.parse(obj.toString())

    if (!obj[key]) return false

    return obj[key]
  }

  delete(key: string) {
    if (!key) throw new Error('[Hata] : Key kısmı boş bırakılamaz.')

    let obj = fs.readFileSync(this.file);
    obj = JSON.parse(obj.toString());

    if (!obj[key]) throw new Error('[Hata] : Bu anahtara ait bir veri bulunamadı.')

    delete obj[key];
    fs.writeFileSync(this.file, JSON.stringify(obj, null, 2), "utf-8")
    return true;
  }

  set(key: string, value: any) {
    if (!key) throw new Error('[Hata]: Key kısmı boş bırakılamaz.')
    if (!value) throw new Error('[Hata]: Value kısmı boş bırakılamaz.')

    let obj = fs.readFileSync(this.file)
    obj = JSON.parse(obj.toString())

    if (!obj[key]) obj[key] = []

    obj[key].push(value)
    fs.writeFileSync(this.file, JSON.stringify(obj, null, 2), 'utf-8')

    return this.get(key)
  }

  remove(key: string, value: any) {
    if (!key) throw new Error('[Hata]: Key kısmı boş bırakılamaz.')
    if (!value) throw new Error('[Hata]: Value kısmı boş bırakılamaz.')

    let obj = fs.readFileSync(this.file)
    obj = JSON.parse(obj.toString())
    obj[key] = obj[key].filter((g: any) => g !== value) // başka ne ekleyelim?

    fs.writeFileSync(this.file, JSON.stringify(obj, null, 2), 'utf-8')

    return this.get(key)
  }

  push(key: string, value: any) {
    if (!key) throw new Error('[Hata] : Key kısmı boş bırakılamaz.')
    if (!value) throw new Error('[Hata] : Value kısmı boş bırakılamaz.')

    let obj = fs.readFileSync(this.file);
    obj = JSON.parse(obj.toString());
    if (!obj[key]) obj[key] = [];
    obj[key].push(value);
    fs.writeFileSync(this.file, JSON.stringify(obj, null, 2), "utf-8")

    return this.get(key);
  }

  add(key: string, value: any) {
    if (!key) throw new Error('[Hata]: Key kısmı boş bırakılamaz.')
    if (!value) throw new Error('[Hata]: Value kısmı boş bırakılamaz.')

    let obj = fs.readFileSync(this.file)
    obj = JSON.parse(obj.toString())
    if (!obj[key]) obj[key] = 0
    obj[key] += value
    fs.writeFileSync(this.file, JSON.stringify(obj, null, 2), 'utf-8')
    return this.get(key)
  }

  subtract(key: string, value: number): number {
    if (!key) throw new Error('[Hata]: Key kısmı boş bırakılamaz.')
    if (!value) throw new Error('[Hata]: Value kısmı boş bırakılamaz.')

    let obj = fs.readFileSync(this.file)
    obj = JSON.parse(obj.toString())

    if (typeof obj[key] != 'number' || typeof value != 'number') return
    if (!obj[key]) obj[key] = 0

    obj[key] -= value
    fs.writeFileSync(this.file, JSON.stringify(obj, null, 2), 'utf-8')
    return this.get(key)
  }

  removeAll(): boolean {
    fs.writeFileSync(this.file, JSON.stringify({}, null, 2), 'utf-8')
    return true
  }

  all() {
    return JSON.parse(fs.readFileSync(this.file).toString())
  }
}

export default FlaiscodeDatabase
