var result = db.gps.aggregate([
    // TODO: 
    {'$match': {'time': input_date}}, // find the data matches with $input_date
    {'$project': {_id:0, time:1, user_id:1,
        // truncate coordinates with the operator trunc
        longitude: {$trunc: [{$arrayElemAt: ['$coordinates', 0]}, 1]}, 
        latitude: {$trunc: [{$arrayElemAt: ['$coordinates', 1]}, 1]}
        }
    },
    // group by {lon, lat} and sum up users as user_count
    {'$group': {_id:{lon:'$longitude', lat:'$latitude'}, user_count: {'$sum': 1}}},
    // sort by the _id {lon, lat}
    {'$sort': {_id: 1}}
]);

result.forEach(function(doc) {
    print("[" + (doc._id.lon) + "," + (doc._id.lat) + "]: " + doc.user_count);
});