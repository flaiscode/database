# Welcome to flaiscode.db 👋

![Version](https://img.shields.io/badge/version-1.0.4-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/flaiscode/database/blob/main/LICENSE)

> flaiscode database

## Author

👤 **flaiscode (nix and ahmet)**

- Website: https://flaiscode.net/
- Discord: https://discord.gg/NfxuWBtkxA
- Github: [@flaiscode](https://github.com/flaiscode)

## Install

```sh
npm install flaiscode.db
```

## Example

```js
const FlaiscodeDatabase = require('flaiscode.db');
const db = new FlaiscodeDatabase('database.json');

db.set('hello', 'world'); // world
db.delete('hello') // true

db.push('fruits', 'orange') // [ "orange" ]
db.push('fruits', 'apple') // [ "orange", "apple" ]
db.unpush('fruits', 'orange') // [ "apple" ]

db.add('level', 10) // 10
db.subtract('level', 8) // 2

db.deleteAll() // true

db.all() // { ... }
```

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

This project is [MIT](https://github.com/flaiscode/database/blob/main/LICENSE) licensed.
