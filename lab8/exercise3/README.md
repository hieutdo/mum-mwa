## Live Demo
[https://exercise3-livszbjddj.now.sh](https://exercise3-livszbjddj.now.sh)

## Create indexes
```javascript
db.locations.createIndex({'name': 'text'})
db.locations.createIndex({'category': 1})
db.locations.createIndex({'coord': '2dsphere'})
```

## Screenshots
![index](screenshots/index.png)

![create](screenshots/create.png)

![edit](screenshots/edit.png)

![search](screenshots/search.png)
