import FlaiscodeDatabase from '../src/'

const db = new FlaiscodeDatabase('database.json')

db.set('hello', 'world!')
console.log(db.get('hello'))
db.delete('hello')

db.push('fruits', 'apple')
db.push('fruits', 'orange')
db.push('fruits', 'peach')
console.log(db.get('fruits'))
db.remove('fruits', 'orange')
console.log(db.get('fruits'))

console.log(db.all())
db.removeAll()
