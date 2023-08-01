
// 격자를 0.1 단위로 하고, 각 격자 내에 있는 사용자 수를 구해야 함
var result = db.gps.aggregate([
    {$match: {'time': input_date}},
    {$project: {
        _id: 0, 
        time: 1,
        user_id: 1,
        loc: {
            $trunc: [{$arrayElemAt: ['$coordinates', 0]}, 1]
        }, 
        lat: {
            $trunc: [{$arrayElemAt: ['$coordinates', 1]}, 1]
        }
    }},
    {$group: {_id: {'loc': '$loc', 'lat': '$lat'}, user_count: {$sum: 1}}},
    {$sort: {'_id:loc': 1, '_id.lat': 1}}
 ]);
 
 result.forEach(function(doc) {
     print("[" + doc._id.loc + "," + doc._id.lat + "]: " + doc.user_count);
 });