## Using the Aggregation framework

1. Find all the zip codes in Iowa state.
    ```javascript
    db.zips.aggregate([
        { 
            $match: { 
                state: 'IA' 
            } 
        }
    ])    
    ```
2. Find all the zip codes with a population less than 1000.
    ```javascript
    db.zips.aggregate([
        {
            $project: {
                city: 1,
                loc: 1,
                pop: 1,
                state: 1,
                popLt1000: { $lt: ['$pop', 1000] }
            }
        },
        {
            $match: {
                popLt1000: true
            }
        },
        {
            $project: {
                popLt1000: 0
            }
        }
    ])
    ```
3. Find all cities that have more than one zip code, sort the results by state and city name.
    ```javascript
    db.zips.aggregate([
        {
            $group: {
                _id: { state: '$state', city: '$city' },
                count: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 1,
                count: 1,
                countGt1: { $gt: ['$count', 1] }
            }
        },
        {
            $match: {
                countGt1: true
            }
        },
        {
            $project: {
                state: '$_id.state',
                city: '$_id.city',
                _id: 0
            }
        },
        {
            $sort: {
                state: 1,
                city: 1
            }
        },
    ])
    ```
4. Display the least populated city in each city.
    ```javascript
    db.zips.aggregate([
        {
            $group: {
                _id: { state: '$state', city: '$city' },
                population: { $sum: '$pop' }
            }
        },
        {
            $sort: {
                '_id.state': 1,
                'population': 1
            }
        },
        {
            $group: {
                _id: '$_id.state',
                city: { $first: "$_id.city" },
                population: { $first: "$population" }
            }
        },
        {
            $sort: {
                '_id': 1, 
            }
        }
    ])
    ```