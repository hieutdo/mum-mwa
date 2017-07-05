Suggestions to tune my Library application performance
* create text index for `isbn`, `title`, `authors.name` and `keywords.name` fields
    ```javascript
    db.books.createIndex({'isbn': 'text', 'title': 'text', 'authors.name': 'text', 'keywords.name': 'text'})
    ```
* create index for `borrowers.studentId` and `borrowers.returnDate` field
    ```javascript
    db.books.createIndex({'borrowers.returnDate': 1})
    db.books.createIndex({'borrowers.studentId': 1})
    ```

