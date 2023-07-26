
// 격자를 0.1 단위로 하고, 각 격자 내에 있는 사용자 수를 구해야 함
var result = db.gps.aggregate([
    {$match: {time: {$gte: input_date}}},
    // {$project: 
    //     {loc: {$divide: [{$subtract: ["$coordinates[0]", {$mod: ["$coordinates[1]", 0.1]}]}, 0.1]}, 
    //     lat: {$divide: [{$subtract: ["$$coordinates[1]", {$mod: ["$coordinates[1]", 0.1]}]}, 0.1]}}
    // },
    {$group: {_id: {loc: "$loc", lat: "$lat"}, user_count: {$sum: 1}}},
    {$sort: {_id: 1}}
 ]);
 
 result.forEach(function(doc) {
     print("[" + doc._id.loc + "," + doc._id.lat + "]: " + doc.user_count);
 });