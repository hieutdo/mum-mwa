## Create index
```javascript
db.locations.createIndex({'name': 'text'})
db.locations.createIndex({'category': 1})
db.locations.createIndex({'coord': '2dsphere'})
```